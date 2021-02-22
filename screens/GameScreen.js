import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

const generateRandomNum = (min, max, exclude) => {
  //ceiling is rounding to the next largest integer
  min = Math.ceil(min);
  //rounding to the largest integer less than or equal input
  max = Math.floor(max);
  const rndmNum = Math.floor(Math.random() * (max - min) + min);
  //excluding certain numbers to give users a chance, like if the computer guesses the solution from the first try
  if (rndmNum === exclude) {
    return generateRandomNum(min, max, exclude);
  } else {
    return rndmNum;
  }
};
const GameScreen = (props) => {
  //excluding the userChoice on the initial value
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNum(1, 99, props.userChoice)
  );
  //useRef creates an object that survives component re-rendering
  const currentLow = useRef(1);
  const currentHigh = useRef(99);

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(true);
    }
  }, [currentGuess]);
  const makeNextGuess = (direction) => {
    if (direction === 'lower' && props.userChoice > currentGuess) {
      Alert.alert('Jokster', 'Please play truthfully', [
        { text: 'Okay', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'higher' && props.userChoice < currentGuess) {
      Alert.alert('Jokster', 'Please play truthfully', [
        { text: 'Okay', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      //if the user choice is lower, then the computer adjusts the max (high value) and the previous guess becomes the current high
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextGuess = generateRandomNum(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
  };
  return (
    <View style={styles.screen}>
      <Text style={{ marginBottom: 20 }}>Opponent Guessed</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="HIGHER" onPress={makeNextGuess.bind(this, 'higher')} />
        <Button title="LOWER" onPress={makeNextGuess.bind(this, 'lower')} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});
export default GameScreen;
