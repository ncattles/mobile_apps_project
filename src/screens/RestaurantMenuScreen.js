import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const RestaurantMenuScreen = (props) => {
  return <View>
    <Text style={styles.text}>RestaurantMenuScreen</Text>
    <Button 
      title="Go To Item"
      onPress={() => {props.navigation.navigate('Item')} }
    />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default RestaurantMenuScreen;
