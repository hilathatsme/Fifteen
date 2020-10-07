import React, {useState, useReducer} from 'react';
import {View, Text, Pressable, Image} from "react-native";

const OpItem = (item, styles) => {
    return <Pressable
        onPress={item?.action}
        style={[styles.opItem, styles[`${item?.name}`]]}
        key={`${item.name}`}
        testID={`${item.name}`}
        >
        {item.imageUrl && <Image source={item.imageUrl}
                                        style={styles.opIcon}
                                        resizeMode='cover'
        />}
        <Text style={styles.opText}>{item?.value}</Text>
    </Pressable>
};

const Controls = (props) => {
    const {styles, undo, moves, newGame, shuffle} = props;
    const initialTime = new Date().getTime();
    const [startTime, setStartTime] = useState(initialTime);

    const [time, dispatch] = useReducer((state , action) => {

        let gap = new Date() - new Date(startTime).getTime();
        let sGap = new Date(gap).getSeconds();
        let mGap = new Date(gap).getMinutes();

        if (action.type === 'add') return {
            seconds: String(sGap).padStart(2, "0"),
            minutes: String(mGap).padStart(2, "0"),
        };
        if (action.type === 'reset') {
            setStartTime(initialTime);
            window.clearInterval();
            return state;
        }
        return state;
    }, {startTime});

    React.useEffect(() => {
        let tim = null;
        tim = setInterval(() => {
            dispatch({ type: 'add' })
                , 1000;
        });
        return () => {
            clearInterval(tim);
        };
    }, []);


    const newG = () => {
        newGame();
        clearInterval();
        dispatch({ type: 'reset' });
    };

    const gameControls = [
        {name: 'MinSec', value: `${time.minutes}:${time.seconds}`},
        {name: 'moves', value: `${moves} Moves`},
        {name: 'undo', value: 'undo', action: undo, imageUrl: require(`./../assets/undo.png`)},
        {name: 'newGame', value: 'New Game', action: newG, imageUrl: require(`./../assets/newGame.png`)},

    ];

    return <View style={styles.op}>
        { gameControls.map(item => {
            return OpItem(item, styles)
        })}
    </View>
};
export default Controls;