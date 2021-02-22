import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text> GAME IS OVER </Text>
      <Button title="RESTART" onPress={() => props.restart()} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default GameOverScreen;
