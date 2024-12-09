import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from "react-native";
import yelp from "../api/yelp";
import { RestaurantContext } from "../context/RestaurantProvider";
import { AuthContext } from "../context/AuthProvider";
import { RestaurantCard } from "../components/RestaurantCard";
import axios from "axios";

const categories = ["Appetizers", "Entrees", "Desserts", "Drinks", "Others"];

const RestaurantMenuScreen = ({ navigation }) => {
  const { selectedRestaurant } = useContext(RestaurantContext); // Access restaurantId from context
  const [menuSections, setMenuSections] = useState({
    Appetizers: [],
    Entrees: [],
    Desserts: [],
    Drinks: [],
    Others: [],
  });
  const [restaurantName, setRestaurantName] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext); // Access token from AuthContext

  // Fetch restaurant details and reviews
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        // Fetch restaurant details from Yelp API
        const restaurantResponse = await yelp.get(`/${selectedRestaurant}`);
        setRestaurantName(restaurantResponse.data.name);

        // Fetch reviews from MongoDB
        const reviewResponse = await axios.get(
          `http://127.0.0.1:3000/restaurants/${selectedRestaurant}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const reviews = reviewResponse.data;

        // Organize reviews by categories
        const categorizedReviews = categories.reduce((acc, category) => {
          acc[category] = reviews.filter((review) => review.category === category);
          return acc;
        }, {});

        setMenuSections(categorizedReviews);
      } catch (error) {
        console.error("Error fetching restaurant details or reviews:", error);
        Alert.alert("Error", "Unable to load restaurant details or reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [selectedRestaurant]);

  // Render items in a section
  const renderMenuItem = (item) => (
    <RestaurantCard
      restaurant={{
        image_url: item.images?.[0] || "https://via.placeholder.com/150", // First image or placeholder
        name: item.item, // Dish name
        rating: item.rating, // Rating out of 5
      }}
      onPress={() => navigation.navigate("ItemReview", { reviewId: item._id })} // Navigate to a review detail screen
    />
  );

  // Render sections
  const renderSection = ({ item: section }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section}</Text>
      <FlatList
        data={menuSections[section]}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => renderMenuItem(item)}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{restaurantName || "Restaurant"} Menu</Text>
      <FlatList
        data={categories}
        keyExtractor={(section) => section}
        renderItem={renderSection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RestaurantMenuScreen;
