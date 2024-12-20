import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

const renderStars = (rating) => {
  const stars = Math.floor(rating);
  return "⭐".repeat(stars);
};

const RestaurantCard = ({ restaurant, onPress, showLikesAndDislikes = false }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.restaurantCard}>
      <Image source={{ uri: restaurant.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.rating}>
          Rating: {restaurant.rating} {renderStars(restaurant.rating)}
        </Text>
        {showLikesAndDislikes && (
          <View style={styles.likeDislikeContainer}>
            <Text style={styles.likeText}>👍 Likes: {restaurant.likes || 0}</Text>
            <Text style={styles.dislikeText}>👎 Dislikes: {restaurant.dislikes || 0}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  restaurantCard: {
    flexDirection: "row",
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 14,
    color: "#666",
  },
  likeDislikeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  likeText: {
    fontSize: 14,
    color: "#28a745",
  },
  dislikeText: {
    fontSize: 14,
    color: "#dc3545",
  },
});

export { RestaurantCard, renderStars };
