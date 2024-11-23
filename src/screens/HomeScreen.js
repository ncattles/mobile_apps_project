import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const HomeScreen = (props) => {
  return <View>
    <Text style={styles.text}>HomeScreen</Text>
    <Button
      title="go to search"
      onPress={() => {props.navigation.navigate('SearchFlow')}}
    />
  </View>
};

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    fontSize: 30,
  },
});

export default HomeScreen;
