import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    console.log("Sign Up button clicked");
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      console.log("Sending request to server...");
      const response = await axios.post("http://127.0.0.1:3000/signup", {
        email,
        password,
      });
      console.log("Sign up response:", response.data);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Signin");
    } catch (error) {
      console.error("Sign up error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Go to Sign In"
        onPress={() => navigation.navigate("Signin")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default SignUpScreen;
