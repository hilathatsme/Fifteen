import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Board from "./components/Board.component";
import {screenSize} from "./utils/dimensions";
import LottieView from "lottie-react-native";

const App = () => {
  const titleElement = <Text style={styles.h1}>FIFTEEN</Text>;
  return (
      <View style={styles.main}>
        <LottieView source={require('./assets/bga.json')} autoPlay={true} loop={true}
                    style={{
                      width: screenSize.width,
                      height: screenSize.height,
                        zIndex: 1,
                    }}
        />
            <SafeAreaView style={{zIndex: 10, position: 'absolute', ...styles.main}}>
            <View contentInsetAdjustmentBehavior="automatic">
              <Board title={titleElement} />
            </View>
          </SafeAreaView>
      </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: screenSize.width,
    height: screenSize.height
  },
  h1: {
    fontSize: 44,
    textAlign: 'center',
    marginVertical: 40,
    color: 'midnightblue',
    fontFamily: 'Avenir-HeavyOblique',
    fontWeight: 'bold'
  }
});

export default App;
