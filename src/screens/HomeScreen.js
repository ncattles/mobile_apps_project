import React, {useState, useEffect, useContext} from "react";
import { Text, StyleSheet, View, Button, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import yelp from "../api/yelp"
import { RestaurantContext } from "../context/RestaurantProvider";

const HomeScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("New Orleans");

  // access context
  const { setSelectedRestaurant } = useContext(RestaurantContext);

  // fetch api data
  const fetchRestaurants = async (term = "New Orleans") => {
    try {
      const response = await yelp.get("/search", {
        params: {
          term: "restaurants",
          location: term,
          limit: 20,
        },
      });
      setRestaurants(response.data.businesses);
    } catch (error) {
      console.error("Error fetching Yelp data:", error);
    }
  };

  // display restaurants on load 
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // generate stars based on rating
  const renderStars = (rating) => {
    const stars = Math.floor(rating); 
    return "⭐".repeat(stars); 
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={() => fetchRestaurants(searchTerm)}
      />

      {/* Title */}
      <Text style={styles.title}>Restaurants Near You</Text>

      {/* Restaurant List */}
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedRestaurant(item.id); // set business ID in context
              navigation.navigate("Restaurant"); 
            }}
          >
            <View style={styles.restaurantCard}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.rating}>Rating: {item.rating} {renderStars(item.rating)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
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
});

export default HomeScreen;
