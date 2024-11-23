import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const ItemReviewScreen = (props) => {
  return <View>
    <Text style={styles.text}>ItemReviewScreen</Text>
    <Button 
      title="Go To User Review"
      onPress={() => {props.navigation.navigate('UserReview')} }
    />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default ItemReviewScreen;
