import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { UserContext } from "../context/UserProvider";
import { AuthContext } from "../context/AuthProvider"; // Import AuthContext
import axios from "axios";

const UserProfileScreen = () => {
  const { userId } = useContext(UserContext); // Access userId from context
  const { token } = useContext(AuthContext); // Access token from AuthContext
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        Alert.alert("Error", "Unable to load user details.");
      }
    };

    if (userId && token) { // Ensure both userId and token are available
      fetchUserDetails();
    }
  }, [userId, token]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.label}>Email: {user.email}</Text>
      <Text style={styles.label}>Role: {user.role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default UserProfileScreen;
