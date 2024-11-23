import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const SigninScreen = (props) => {
  return <View>
    <Text style={styles.text}>SigninScreen</Text>
    <Button 
      title='Sign In'
      onPress={() => {props.navigation.navigate('mainFlow')}}
    />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default SigninScreen;
