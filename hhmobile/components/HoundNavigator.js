import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HeaderButtons, HeaderButton, Item } from "react-navigation-header-buttons";
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import DetailsScreen from "../screens/DetailsScreen";
import Colors from "../constants/colors";

const HomeStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomHeaderButton = props => (
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={25} color={Platform.OS === 'android' ? 'white' : Colors.primaryColor} />
);

const HeaderButtonRight = props => {
    return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-more" : "ios-more"}
                onPress={() => {
                  props.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
    )
}
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: {
    fontSize: 24,
    fontFamily: "montserrat-bold"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "Hotel Hound",

};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={({navigation, route}) => ({
        ...defaultStackNavOptions,
        headerRight: () => <HeaderButtonRight navigation={navigation} route={route} />
        })}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
};

const FavoriteStackNavigator = () => {
  return (
    <FavoriteStack.Navigator screenOptions={({navigation, route}) => ({
        ...defaultStackNavOptions,
        headerRight: () => <HeaderButtonRight navigation={navigation} route={route} />
        })}>
      <FavoriteStack.Screen name="Favorites" component={FavoritesScreen} />
      <FavoriteStack.Screen name="Details" component={DetailsScreen} />
    </FavoriteStack.Navigator>
  );
};

const HoundNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
      initialRouteName="Hotels"
      drawerPosition="right">
        <Drawer.Screen name="Hotels" component={HomeStackNavigator} />
        <Drawer.Screen name="Favorites" component={FavoriteStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default HoundNavigator;
