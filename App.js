import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";

const switchNavigator = createSwitchNavigator({
  loginFlow: 
    { Signup: SignupScreen,
      Signin: SigninScreen,
    },
  mainFlow: createMaterialBottomTabNavigator({ 
    restaurantSearchFlow: createStackNavigator({
      Home: HomeScreen,
      Search: SearchScreen,
      Restaurant: RestaurantHomeScreen,
      RestaurantMenu: RestaurantMenuScreen,
      Item: ItemReviewScreen,
      UserItemReview: UserItemReviewScreen,
      UserProfile: UserProfileScreen,
    }),
    Search: SearchScreen,
    Account: AccountScreen
  }),
});

export default createAppContainer(switchNavigator);