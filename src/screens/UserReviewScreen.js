import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const UserReviewScreen = (props) => {
  return <View>
    <Text style={styles.text}>UserReviewScreen</Text>
    <Button 
      title="Go To User Profile"
      onPress={() => {props.navigation.navigate('UserProfile')} }
    />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default UserReviewScreen;
