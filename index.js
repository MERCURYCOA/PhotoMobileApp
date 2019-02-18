import { AppRegistry } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "./Components/HomeScreen";
import DetailScreen from "./Components/DetailScreen";

// Create navigator
const AppNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    DetailScreen: DetailScreen
  },
  {
    initialRouteName: "HomeScreen"
  }
);

// Wrap navigator to root
const FlickrPhotoApp = createAppContainer(AppNavigator);

//Ignore warnings
console.disableYellowBox = true;

AppRegistry.registerComponent("FlickrPhotoApp", () => FlickrPhotoApp);
