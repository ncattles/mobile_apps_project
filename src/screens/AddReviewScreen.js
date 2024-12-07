import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const AddReviewScreen = (props) => {
  return <View>
    <Text style={styles.text}>AddReviewScreen</Text>
    <Button 
      title="Submit Review"
      onPress={() => {props.navigation.navigate('Restaurant')} }
    />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default AddReviewScreen;
