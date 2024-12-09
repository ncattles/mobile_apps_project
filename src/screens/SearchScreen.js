import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, TextInput, FlatList, Button } from "react-native";
import yelp from "../api/yelp";
import { RestaurantContext } from "../context/RestaurantProvider";
import { RestaurantCard } from "../components/RestaurantCard";

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("New Orleans");
  const [searchResults, setSearchResults] = useState([]);
  const { setSelectedRestaurant } = useContext(RestaurantContext);

  // fetch businesses by name and location
  const fetchBusinesses = async () => {
    try {
      const response = await yelp.get("/search", {
        params: {
          term: searchTerm || "restaurants",
          location: location || "New Orleans",
          limit: 30,
        },
      });
      setSearchResults(response.data.businesses);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Search Food</Text>

      {/* Search Bars */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by business name"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TextInput
        style={styles.locationBar}
        placeholder="Search by location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Search Button */}
      <Button title="Search" onPress={fetchBusinesses} />

      {/* Search Results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => {
              setSelectedRestaurant(item.id); // update context with restaurantID
              navigation.navigate("Restaurant");
            }}
          />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  locationBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
});

export default SearchScreen;
