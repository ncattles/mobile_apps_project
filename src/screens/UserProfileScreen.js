import React from "react";
import { Text, StyleSheet, View } from "react-native";

const UserProfileScreen = (props) => {
  return <View>
    <Text style={styles.text}>UserProfileScreen</Text>
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default UserProfileScreen;
