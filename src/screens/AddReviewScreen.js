import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button,StyleSheet, Alert, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RestaurantContext } from "../context/RestaurantProvider";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const categories = ["Appetizers", "Entrees", "Desserts", "Drinks", "Others"];

const AddReviewScreen = ({ navigation }) => {
  const { selectedRestaurant } = useContext(RestaurantContext); // access restaurantId from context
  const { token } = useContext(AuthContext); // access token from AuthContext
  const [category, setCategory] = useState("Appetizers"); // default category
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [images, setImages] = useState([]); // Multiple images

  // Generic image picker function
  const pickImage = async (fromCamera) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert("Permission Denied", `Access to ${fromCamera ? "camera" : "gallery"} is required.`);
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri]); // Add new image to the list
    }
  };

  // Handle adding a picture
  const handleAddPicture = () => {
    Alert.alert("Add Picture", "Choose an option", [
      { text: "Take a Picture", onPress: () => pickImage(true) },
      { text: "Import from Gallery", onPress: () => pickImage(false) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleSubmit = async () => {
    if (!category || !item || !description || !rating) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (rating < 1 || rating > 5) {
      Alert.alert("Error", "Rating must be between 1 and 5.");
      return;
    }

    try { 
      const response = await axios.post(
        `http://127.0.0.1:3000/restaurants/${selectedRestaurant}/reviews`,
        {
          category,
          item,
          description,
          rating: parseInt(rating, 10), // Ensure rating is a number
          images, // Submit the list of images
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Review submitted successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "Something went wrong.");
    }
  };

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.imagePreview} />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Review</Text>

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, category === cat && styles.selectedCategory]}
            onPress={() => setCategory(cat)}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter food item name"
        value={item}
        onChangeText={setItem}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter a description of the food"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Rating (1-5)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Images</Text>
      <FlatList
        data={images}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        style={styles.imageList}
      />
      <TouchableOpacity style={styles.captureButton} onPress={handleAddPicture}>
        <Text style={styles.captureButtonText}>Add Image</Text>
      </TouchableOpacity>

      <Button title="Submit Review" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  selectedCategory: {
    backgroundColor: "#007BFF",
  },
  categoryText: {
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 100,
    textAlignVertical: "top",
  },
  imageList: {
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  captureButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  captureButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddReviewScreen;
