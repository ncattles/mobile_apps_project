import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import HomeScreen from "./src/screens/HomeScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SearchScreen from "./src/screens/SearchScreen";
import RestaurantHomeScreen from "./src/screens/RestaurantHomeScreen";
import RestaurantMenuScreen from "./src/screens/RestaurantMenuScreen";
import ItemReviewScreen from "./src/screens/ItemReviewScreen";
import UserReviewScreen from "./src/screens/UserReviewScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddReviewScreen from './src/screens/AddReviewScreen';
import { RestaurantProvider } from './src/context/RestaurantProvider';
import { AuthProvider } from './src/context/AuthProvider';
import { ReviewProvider } from './src/context/ReviewProvider';
import { UserProvider } from './src/context/UserProvider';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createMaterialBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={24} /> 
          ),
        },
      },
      Search: {
        screen: createStackNavigator({
          SearchFlow: SearchScreen,
          Restaurant: RestaurantHomeScreen,
          AddReview: AddReviewScreen,
          RestaurantMenu: RestaurantMenuScreen,
          ItemReview: ItemReviewScreen,
          UserReview: UserReviewScreen,
          UserProfile: UserProfileScreen,
        }),
        navigationOptions: {
          tabBarIcon: ({ color }) => (
            <Icon name="magnify" color={color} size={24} /> 
          ),
        },
      },
      Account: {
        screen: AccountScreen,
        navigationOptions: {
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={24} /> 
          ),
        },
      },
    },
    {
      initialRouteName: "Home",
    }
  ),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <UserProvider>
          <RestaurantProvider>
            <ReviewProvider>
              <App />
            </ReviewProvider>
          </RestaurantProvider>
        </UserProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};