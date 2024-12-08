import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }) => {
  const [avatarUri, setAvatarUri] = useState(null);

  // Load avatar from AsyncStorage
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const savedAvatar = await AsyncStorage.getItem('userAvatar');
        if (savedAvatar) {
          setAvatarUri(savedAvatar);
        }
      } catch (error) {
        console.error('Failed to load avatar:', error);
      }
    };

    loadAvatar();
  }, []);

  // Save avatar to AsyncStorage
  useEffect(() => {
    const saveAvatar = async () => {
      try {
        if (avatarUri) {
          await AsyncStorage.setItem('userAvatar', avatarUri);
        }
      } catch (error) {
        console.error('Failed to save avatar:', error);
      }
    };

    saveAvatar();
  }, [avatarUri]);

  // Generic image picker function
  const pickImage = async (fromCamera) => {
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
      setAvatarUri(result.assets[0].uri);
    }
  };

  // Handle adding avatar
  const handleAddAvatar = () => {
    Alert.alert('Add Avatar', 'Choose an option', [
      { text: 'Take a Picture', onPress: () => pickImage(true) },
      { text: 'Import from Gallery', onPress: () => pickImage(false) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // Handle deleting avatar
  const handleDeleteAvatar = () => {
    Alert.alert('Delete Avatar', 'Are you sure you want to delete your avatar?', [
      { text: 'Yes', onPress: () => {
          setAvatarUri(null);
          AsyncStorage.removeItem('userAvatar').catch((error) => console.error('Failed to delete avatar:', error));
        } },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>
      <View style={styles.avatarContainer}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <TouchableOpacity onPress={handleAddAvatar}>
            <Text style={styles.addAvatarText}>+ Add Avatar</Text>
          </TouchableOpacity>
        )}
      </View>
      {avatarUri && (
        <TouchableOpacity style={styles.deleteAvatarButton} onPress={handleDeleteAvatar}>
          <Text style={styles.deleteAvatarText}>Delete Avatar</Text>
        </TouchableOpacity>
      )}
       {/* Navigation Options */}
       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfile')}>
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => alert('Logged out')}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  addAvatarText: {
    fontSize: 16,
    color: '#007bff',
  },
  deleteAvatarButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    marginBottom: 30,
  },
  deleteAvatarText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AccountScreen;
