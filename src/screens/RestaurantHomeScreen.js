import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Image } from "react-native";
import { RestaurantContext } from "../context/RestaurantProvider";
import yelp from "../api/yelp"
import { renderStars } from "../components/RestaurantCard";

const RestaurantHomeScreen = ({ navigation }) => {
  const { selectedRestaurant } = useContext(RestaurantContext); // get restaurantID from context
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  // fetch restaurant details by id
  const fetchRestaurantDetails = async (id) => {
    try {
      const response = await yelp.get(`/${id}`);
      setRestaurantDetails(response.data);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  useEffect(() => {
    if (selectedRestaurant) {
      fetchRestaurantDetails(selectedRestaurant); // use selected restaurant id
    }
  }, [selectedRestaurant]);

  if (!restaurantDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderPhoto = ({ item }) => (
    <Image source={{ uri: item }} style={styles.photo} />
  );

  return (
    <View style={styles.container}>
      {/* Restaurant Header */}
      <View style={styles.header}>
        <Text style={styles.restaurantName}>{restaurantDetails.name}</Text>
        <Text style={styles.category}>
          {restaurantDetails.categories[0]?.title || "No Category"}
        </Text>
        <Text style={styles.rating}>
          Rating: {restaurantDetails.rating}
        <Text style={styles.stars}>{renderStars(restaurantDetails.rating)}</Text>
        </Text>
        <Text style={styles.infoText}>📍 {restaurantDetails.location.display_address.join(", ")}</Text>
        <Text style={styles.infoText}>📞 {restaurantDetails.display_phone}</Text>
        <Text style={styles.infoText}>
          {restaurantDetails.hours[0]?.is_open_now ? "🟢 Open Now" : "🔴 Closed"}
        </Text>
        <Text style={styles.infoText}>💵 {restaurantDetails.price || "Not Available"}</Text>
      </View>

      {/* Photo Gallery */}
      <Text style={styles.photosTitle}>Photos</Text>
      <FlatList
        data={restaurantDetails.photos.slice(0, 6)} // Display up to 6 photos
        renderItem={renderPhoto}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RestaurantMenu")}
      >
        <Text style={styles.buttonText}>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddReview")}
      >
        <Text style={styles.buttonText}>Add Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f3f3f3",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 18,
    color: "#666",
    marginTop: 4,
  },
  stars: {
    marginLeft:10,
    fontSize: 18, 
  },
  infoText: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  photosTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  photosList: {
    marginBottom: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#f3f3f3",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RestaurantHomeScreen;
