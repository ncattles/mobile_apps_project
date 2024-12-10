import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Image,TouchableOpacity, FlatList, ScrollView } from "react-native";
import { ReviewContext } from "../context/ReviewProvider";
import { AuthContext } from "../context/AuthProvider";
import { UserContext } from "../context/UserProvider";
import axios from "axios";

const renderStars = (rating) => {
  const stars = Math.floor(rating);
  return "⭐".repeat(stars);
};

const ItemReviewScreen = ({navigation}) => {
  const { reviewId } = useContext(ReviewContext); // access reviewId from context
  const { token } = useContext(AuthContext); // access token from AuthContext
  const { setUserId } = useContext(UserContext);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/reviews/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review:", error);
        Alert.alert("Error", "Unable to load review details.");
      } finally {
        setLoading(false);
      }
    };

    if (reviewId) {
      fetchReviewDetails();
    }
  }, [reviewId]);

  const handleLike = async () => {
    try {
      await axios.patch(
        `http://127.0.0.1:3000/reviews/${reviewId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReview((prevReview) => ({ ...prevReview, likes: prevReview.likes + 1 }));
    } catch (error) {
      console.error("Error liking the review:", error);
      Alert.alert("Error", "Unable to like the review.");
    }
  };

  const handleDislike = async () => {
    try {
      await axios.patch(
        `http://127.0.0.1:3000/reviews/${reviewId}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReview((prevReview) => ({ ...prevReview, dislikes: prevReview.dislikes + 1 }));
    } catch (error) {
      console.error("Error disliking the review:", error);
      Alert.alert("Error", "Unable to dislike the review.");
    }
  };

  if (!review) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Review not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}> 
        <Text style={styles.sectionTitle}>Reviewer</Text>
        <TouchableOpacity
          onPress={() => {
          setUserId(review.user._id); 
          navigation.navigate("UserProfile", { userId: review.user._id }); 
          }}
        >
  <Text style={styles.reviewerText}>{review.user?.email || "Anonymous Reviewer"}</Text>
</TouchableOpacity>

      <Text style={styles.sectionTitle}>Item</Text>
      <Text style={styles.item}>{review.item}</Text>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{review.description}</Text>

      <Text style={styles.sectionTitle}>Rating</Text>
      <Text style={styles.rating}>
        {renderStars(review.rating)} ({review.rating}/5)
      </Text>

      <Text style={styles.sectionTitle}>Images</Text>
      {review.images?.length > 0 ? (
        <FlatList
          data={review.images}
          horizontal
          keyExtractor={(imageUri, index) => index.toString()}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
        />
      ) : (
        <Text style={styles.noImages}>No images available.</Text>
      )}

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Text style={styles.likeText}>👍 Like ({review.likes || 0})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dislikeButton} onPress={handleDislike}>
          <Text style={styles.dislikeText}>👎 Dislike ({review.dislikes || 0})</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 20,
  },
  item: {
    fontSize: 16,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  rating: {
    fontSize: 16,
    color: "#007BFF",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },
  noImages: {
    fontSize: 14,
    color: "#888",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  likeButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  dislikeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  likeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dislikeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default ItemReviewScreen;
