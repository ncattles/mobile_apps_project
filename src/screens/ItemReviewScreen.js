import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ItemReviewScreen = ({ navigation }) => {
  const username = 'Please pass the username for USER1 who AddReview here';
  const email = 'Please pass their email too@example.com';

  return (
    <View style={styles.container}>
      <Text style={styles.userInfo}>On the left corner, please do a sort system. For example: Most recents or Most liked based on like counts.</Text>
      <Text style={styles.userInfo}>It will be a list of many users reviewing this specific dish.</Text>
      <Text style={styles.userInfo}>USER 1 example:</Text>

      <Text style={styles.userInfo}>Username: {username || 'Not Provided'}</Text>
      <Text style={styles.userInfo}>Email: {email || 'Not Provided'}</Text>
      <Text style={styles.userInfo}>LIKE&DISLIKE: Pass the like and dislike counts from UserReview here</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserReview', { username, email })}
      >
        <Text style={styles.buttonText}>You want to see how user1 rates the dish?</Text>
      </TouchableOpacity>

      <Text style={styles.userInfo}>Keep repeating for other USERS</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserReview', { username, email })}
      >
        <Text style={styles.buttonText}>You want to see how user2 rates the dish?</Text>
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
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ItemReviewScreen;
