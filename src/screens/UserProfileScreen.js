import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfileScreen = ({ route }) => {
  const { username, email } = route?.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.info}>Username: {username || 'No username provided'}</Text>
      <Text style={styles.info}>Email: {email || 'No email provided'}</Text>
      <Text style={styles.info}>I need other data from ItemReview and UserReview to finish this screen {email || 'No email provided'}</Text>
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
});

export default UserProfileScreen;
