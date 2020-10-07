import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {GameState} from '../classes/GameState';
import Tile from './Tile.component';
import Controls from "./Controls.component";
import Popup from "./Popup.Component";
import LottieView from "lottie-react-native";
import {screenSize} from "../utils/dimensions";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const Board = (props) => {
    function useGameState () {
        const gameState = GameState.getInstance();

        const [state, setState] = React.useState(gameState.getState());

        function newGame () {
            gameState.startNewGame();
            setState(gameState.getState());
        }

        function undo () {
            gameState.undo();
            setState(gameState.getState());
        }

        function move (i, direction, swipeState) {
            // to overcome library issues with swipe direction recognition
            const figureHorizontalDirection = (delta) => (delta > 0 ? 'right' : 'left')
            const figureVerticalDirection = (delta) => (delta > 0 ? 'down' : 'up')
            const calcDirection = Math.abs(swipeState.dx) > Math.abs(swipeState.dy) ? figureHorizontalDirection(swipeState.dx) : figureVerticalDirection(swipeState.dy)
            gameState.moveInDirection(calcDirection);
            setState(gameState.getState());
        }

        function shuffle () {
            gameState.shuffle();
            setState(gameState.getState());
        }

        return [state.board, state.moves, state.solved, state.epos, newGame, undo, move, shuffle];
    }

    const [board, moves, solved, epos, newGame, undo, move, shuffle] = useGameState();

    const winPopup =<Popup style={styles.winPop}>
        <LottieView source={require('../assets/stars.json')} autoPlay={true} loop={true} style={{height: 400 }}  />
        <Pressable onPress={newGame} style={{height: 70, width: 200}}>
            <Text style={styles.playAgain}>PLAY AGAIN</Text>
        </Pressable>
    </Popup>;


    return (
        <View style={styles.gameContainer} testID={'title'}>
            {props.title}
            <Controls styles={styles}
                      undo={undo}
                      moves={moves}
                      newGame={newGame}
                      shuffle={shuffle}
            />
            <View className='board' style={styles.board}>
                { board.map((pos, index) => (
                            <Tile index={index}
                              pos={pos}
                              style={styles.tile}
                              key={pos}
                              onTileSwipe={(direction, swipeState) => move(index, direction, swipeState)}
                              epos={epos}
                        />
                    ))
                }
            </View>
            { solved && winPopup}
        </View>
    );
}

const styles = StyleSheet.create({
    gameContainer: {
        height: screenSize.height,
        width: screenSize.width,
        alignSelf: 'flex-start'

    },
    board: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    },
    tile: {
        width: screenSize.width/4.5,
        height: screenSize.width/4.5,
        borderRadius: 4,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    playAgain: {
        fontSize: 24,
        fontWeight: '700',
        backgroundColor: '#90589B',
        borderRadius: 4,
        borderColor: '#A8C7F6',
        borderWidth: 8,
        color: 'yellow',
        padding: 20,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: -50

    },
    op: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        flexWrap: 'wrap',
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    opItem: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 2
    },
    opText: {
        fontFamily: 'Avenir-HeavyOblique',
        fontSize: 18,
        color: 'darkviolet',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    opIcon: {
        width: 20,
        height: 20,
        marginRight: 5
    }
});
export default Board;