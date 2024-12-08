import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For star icons

const UserProfileScreen = ({ navigation }) => {
  // Get the userName and userEmail from navigation params
  const userName = navigation.getParam('userName', 'Unknown User');
  const userEmail = navigation.getParam('userEmail', 'No Email Provided');

  // Mock review data
  const [reviews, setReviews] = useState([
    {
      id: '1',
      foodName: 'Spaghetti Carbonara',
      restaurantName: 'Italian Bistro',
      rating: 4,
    },
    {
      id: '2',
      foodName: 'Sushi Platter',
      restaurantName: 'Tokyo Delight',
      rating: 5,
    },
    {
      id: '3',
      foodName: 'Burger Deluxe',
      restaurantName: 'Burger Joint',
      rating: 3,
    },
  ]);

  // Render stars for a given rating
  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <View style={styles.stars}>
        {[...Array(totalStars)].map((_, index) => (
          <FontAwesome
            key={index}
            name="star"
            size={20}
            color={index < rating ? '#FFD700' : '#D3D3D3'}
          />
        ))}
      </View>
    );
  };

  // Render each review item
  const renderReviewItem = ({ item }) => (
    <TouchableOpacity style={styles.reviewCard} onPress={() => alert('View Review Details')}>
      <Text style={styles.foodName}>{item.foodName}</Text>
      <Text style={styles.restaurantName}>{item.restaurantName}</Text>
      {renderStars(item.rating)}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      {/* Reviews List */}
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.reviewList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#6c757d',
  },
  reviewList: {
    paddingBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantName: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 5,
  },
  stars: {
    flexDirection: 'row',
  },
});

export default UserProfileScreen;
