import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

const SearchScreen = (props) => {
  return <View>
    <Text style={styles.text}>SearchScreen</Text>
    <Button
      title="go to restaurant"
      onPress={() => {props.navigation.navigate('Restaurant')}}
    />
  </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default SearchScreen;
