import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const SignUpScreen = (props) => {
  return <View>
    <Text style={styles.text}>SignUpScreen</Text>
    <Button 
      title='Go to Signin Screen'
      onPress={() => {props.navigation.navigate('Signin')}}
    />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default SignUpScreen;
