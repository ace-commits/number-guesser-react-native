import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors.js';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = (props) => {
  const [userInput, setUserInput] = useState('');
  const [inputConfirmed, setInputConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const userInputHandler = (enteredText) => {
    //anything that is not a number in the entire text is replaced
    //with an empty string
    enteredText = enteredText.replace(/[^0-9]/g, '');
    setUserInput(enteredText);
  };

  const resetInput = () => {
    setUserInput('');
    setInputConfirmed(false);
    Keyboard.dismiss();
  };

  const confirmInput = () => {
    const parsedNumber = parseInt(userInput);
    if (isNaN(parsedNumber) || parsedNumber <= 0 || parsedNumber > 99) {
      Alert.alert(
        'Invalid Number!',
        'Please choose a number between 1 and 99 inclusive',
        [{ text: 'Okay', style: 'destructive', onPress: resetInput }]
      );
      return;
    }
    setInputConfirmed(true);
    setSelectedNumber(parsedNumber);
    setUserInput('');
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (inputConfirmed) {
    confirmedOutput = (
      <Card style={{ marginTop: 20, alignItems: 'center' }}>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="Start Game"
          onPress={() => props.toStartGame(selectedNumber)}
        />
      </Card>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={{ marginTop: 30, marginBottom: 15, fontSize: 25 }}>
          Start Game{' '}
        </Text>
        <Card style={styles.inputContainer}>
          <Text style={{ marginTop: 5, fontSize: 15, marginBottom: 20 }}>
            Select a Number
          </Text>
          <Input
            style={styles.input}
            blurOnSubmit
            keyboardType="numeric"
            maxLength={2}
            onChangeText={userInputHandler}
            value={userInput}
          />
          <View style={styles.buttonContainer}>
            <View style={{ width: 100 }}>
              <Button
                color={Colors.primary}
                title="Confirm"
                onPress={confirmInput}
              />
            </View>
            <View style={{ width: 100 }}>
              <Button
                color={Colors.accent}
                title="Reset"
                onPress={resetInput}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
    // for responsive
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    width: '100%',
  },
  input: {
    width: 50,
    textAlign: 'center',
    marginVertical: 20,
  },
  confirmContainer: {
    backgroundColor: 'green',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 40,
    fontSize: 50,
    elevation: 30,
  },
});
export default StartGameScreen;
