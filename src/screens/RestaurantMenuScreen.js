import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const RestaurantMenuScreen = ({ navigation }) => {
  const [menuSections, setMenuSections] = useState({
    Appetizers: [],
    Entrees: [],
    Desserts: [],
    Drinks: [],
    Others: [],
  });

  const [newItemNames, setNewItemNames] = useState({
    Appetizers: '',
    Entrees: '',
    Desserts: '',
    Drinks: '',
    Others: '',
  });

  // Generic image picker function
  const pickImage = async (fromCamera, section, itemId) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert('Permission Denied', `Access to ${fromCamera ? 'camera' : 'gallery'} is required.`);
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 });

    if (!result.canceled) {
      updateSectionWithImage(section, itemId, result.assets[0].uri);
    }
  };

  // Handle adding a picture
  const handleAddPicture = (section, itemId) => {
    Alert.alert('Add Picture', 'Choose an option', [
      { text: 'Take a Picture', onPress: () => pickImage(true, section, itemId) },
      { text: 'Import from Gallery', onPress: () => pickImage(false, section, itemId) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // Update the section with the selected image
  const updateSectionWithImage = (section, itemId, imageUri) => {
    setMenuSections((prevSections) => {
      const updatedSection = prevSections[section].map((item) =>
        item.id === itemId ? { ...item, imageUri } : item
      );
      return { ...prevSections, [section]: updatedSection };
    });
  };

  // Add a new item to a section
  const addNewItemToSection = (section) => {
    const dishName = newItemNames[section].trim();

    if (!dishName) {
      Alert.alert('Error', 'Please enter a name for the dish.');
      return;
    }

    const newItem = {
      id: String(Math.random()),
      name: dishName,
      imageUri: null,
    };

    setMenuSections((prevSections) => {
      return {
        ...prevSections,
        [section]: [...prevSections[section], newItem],
      };
    });

    setNewItemNames((prevNames) => ({ ...prevNames, [section]: '' }));
  };

  // Render items in a section
  const renderMenuItem = (section, item) => (
    <View style={styles.menuItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
      ) : (
        <TouchableOpacity onPress={() => handleAddPicture(section, item.id)}>
          <Text style={styles.addPictureText}>+ Add Picture</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Item', { itemName: item.name, itemImageUri: item.imageUri })}>
        <Text style={styles.reviewButton}>See review for this dish</Text>
      </TouchableOpacity>
    </View>
  );

  // Render sections
  const renderSection = ({ item: section }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section}</Text>
      <FlatList
        data={menuSections[section]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderMenuItem(section, item)}
      />
      <TextInput
        style={styles.input}
        placeholder={`Enter dish name for ${section}`}
        value={newItemNames[section]}
        onChangeText={(text) => setNewItemNames({ ...newItemNames, [section]: text })}
      />
      <TouchableOpacity onPress={() => addNewItemToSection(section)}>
        <Text style={styles.addItemText}>+ Add Item</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>Italian Bistro</Text>
      <Text style={styles.adminMode}>Restaurant Administration Mode</Text>
      <FlatList
        data={Object.keys(menuSections)}
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
    backgroundColor: '#f8f9fa',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  adminMode: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  addPictureText: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 10,
  },
  reviewButton: {
    fontSize: 14,
    color: '#28a745',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  addItemText: {
    fontSize: 14,
    color: '#007bff',
  },
});

export default RestaurantMenuScreen;
