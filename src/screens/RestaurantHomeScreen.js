import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const RestaurantHomeScreen = (props) => {
  return <View>
    <Text style={styles.text}>RestaurantHomeScreen</Text>
    <Button 
      title="Go To Restaurant Menu"
      onPress={() => {props.navigation.navigate('RestaurantMenu')} }
    />
    <Button 
      title="Add Review"
      onPress={() => {props.navigation.navigate('AddReview')} }
    />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default RestaurantHomeScreen;
