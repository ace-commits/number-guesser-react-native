import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
export default function App() {
  const [userNum, setUserNum] = useState();
  const [gameOver, setGameOver] = useState(false);

  const restartGame = () => {
    setGameOver(false);
    setUserNum(null);
  };
  //if the userNum is an entered number, then start game
  const changeUserNum = (selectedNum) => {
    setUserNum(selectedNum);
  };

  const setGameOverFn = (numberRounds) => {
    setGameOver(numberRounds);
  };

  let content = <StartGameScreen toStartGame={changeUserNum} />;

  if (userNum) {
    content = <GameScreen userChoice={userNum} onGameOver={setGameOverFn} />;
  }
  if (gameOver) {
    content = <GameOverScreen restart={restartGame} />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
