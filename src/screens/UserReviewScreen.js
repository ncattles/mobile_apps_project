import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserReviewScreen = ({ route, navigation }) => {
  const { username, email } = route?.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User rate for the dish</Text>
      <Text style={styles.info}>Username: {username || 'Please pass USERNAME that you choose to see their review from ItemReview here'}</Text>
      <Text style={styles.info}>Email: {email || 'Their email too'}</Text>
      <Text style={styles.info}>Please pass the Picture taken from that USER who did AddReview here, not the one in the RestaurantMenu. That one is for the offical menu from the Restaurant Adminstration</Text>
      <Text style={styles.info}>Please pass the description of what that User review about the food on AddReview</Text>
      <Text style={styles.info}>Please pass the YELLOW and GREY Stars voting from USER who AddReview as well and CREATE two LIKE and DISLIKE button for other users here too</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile',{username, email})}>
        <Text style={styles.userProfileButton}>See this User Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  userProfileButton: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserReviewScreen;
