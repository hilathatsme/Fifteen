import React from 'react';
import {View, StyleSheet} from 'react-native';
import {screenSize} from "../utils/dimensions";

const Popup = (props) => (
    <View style={{...styles.container, ...props.style}}>
        {props.children}
    </View>

);
const styles = StyleSheet.create({
    container: {
        zIndex: 15,
        position: 'absolute',
        width: screenSize.width,
        height: screenSize.height,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        alignItems:'center',
        justifyContent: 'space-evenly',
    }
})
export default Popup;