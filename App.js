import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
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

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createMaterialBottomTabNavigator({ 
    restaurantFlow: createStackNavigator({
      Home: HomeScreen,
      Search: SearchScreen,
      Restaurant: RestaurantHomeScreen,
      RestaurantMenu: RestaurantMenuScreen,
      Item: ItemReviewScreen,
      UserReview: UserReviewScreen,
      UserProfile: UserProfileScreen,
    }),
    Search: SearchScreen,
    Account: AccountScreen
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  // was getting error if App wasnt wrapped in SafeAreaProvider
  return <SafeAreaProvider>  
    <App></App>
  </SafeAreaProvider>
};