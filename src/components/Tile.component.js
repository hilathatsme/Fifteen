import React from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import {View, Text} from 'react-native';
import {screenSize} from "../utils/dimensions";


const Tile = ({index, pos, onTileSwipe, style, epos}) => {
    const tileIndex = pos[2];
    // const tileIndexLeft = ((tileIndex%4)*95) - 190;
    const tileIndexLeft = ((tileIndex%4) * (screenSize.width/4.2)) - screenSize.width/2.13;
    const tileIndexTop = (Math.floor(tileIndex/4) * (screenSize.width/4.2)) + 20;

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };


    // epos original index is stored in epos[2], should match the tile's
    const isEmpty = epos[2] === tileIndex;
    const bgColor = isEmpty ? 'transparent' : 'rgba(119, 26, 153, 0.9)';

    return <GestureRecognizer
            onSwipe={(direction, swipeState) => onTileSwipe(direction, swipeState)}
            config={config}
        >
        <View
            className='tile'
            style={[
                    {...style},
                    {transform: [{translateX: tileIndexLeft}, {translateY: tileIndexTop}]},
                    {backgroundColor: bgColor},
                ]}
        >
            <Text style={{fontSize: 25, color: 'whitesmoke', fontWeight: '600'}}>{!isEmpty && index+1}</Text>
        </View>
    </GestureRecognizer>
};

export default Tile;

