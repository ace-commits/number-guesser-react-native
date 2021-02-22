import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
const Header = (props) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingTop: 36,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  headerText: {
    color: 'black',
    fontSize: 25,
  },
});
export default Header;
