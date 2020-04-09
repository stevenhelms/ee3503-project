import React from "react";
import { Platform, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import DetailsScreen from "../screens/DetailsScreen";
import Colors from "../constants/colors";

const HomeStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const Drawer = createDrawerNavigator();

/* Added a quick boolean variable so I can switch between drawer navigation and tab navigation */
const USE_DRAWER_NAV = false;

const CustomHeaderButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={25}
    color={Platform.OS === "android" ? "white" : Colors.primaryColor}
  />
);

const HeaderButtonRight = (props) => {
  return USE_DRAWER_NAV ? (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-more" : "ios-more"}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ) : null;
};
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontSize: 24,
    fontFamily: "montserrat-bold",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "Hotel Hound",
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation, route }) => ({
        ...defaultStackNavOptions,
        headerRight: () => (
          <HeaderButtonRight navigation={navigation} route={route} />
        ),
      })}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
};

const FavoriteStackNavigator = () => {
  return (
    <FavoriteStack.Navigator
      screenOptions={({ navigation, route }) => ({
        ...defaultStackNavOptions,
        headerRight: () => (
          <HeaderButtonRight navigation={navigation} route={route} />
        ),
      })}
    >
      <FavoriteStack.Screen name="Favorites" component={FavoritesScreen} />
      <FavoriteStack.Screen name="Details" component={DetailsScreen} />
    </FavoriteStack.Navigator>
  );
};

const HomeTab =
  Platform.OS == "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <HomeTab.Navigator
      activeColor="white"
      inactiveColor={Colors.accentColor}
      barStyle={{
        backgroundColor: Colors.primaryColor,
      }}
    >
      <HomeTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name={Platform.OS == "android" ? "md-home" : "ios-home"}
                size={24}
                color={color}
              />
            );
          },
          tabBarLabel:
            Platform.OS == "android" ? (
              <Text style={{ fontFamily: "montserrat" }}>Home</Text>
            ) : (
              "Home"
            ),
        }}
      ></HomeTab.Screen>
      <HomeTab.Screen
        name="Favorites"
        component={FavoriteStackNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name={Platform.OS == "android" ? "md-star" : "ios-star"}
                size={24}
                color={color}
              />
            );
          },
          tabBarLabel:
            Platform.OS == "android" ? (
              <Text style={{ fontFamily: "montserrat" }}>Favorites</Text>
            ) : (
              "Favorites"
            ),
        }}
      ></HomeTab.Screen>
    </HomeTab.Navigator>
  );
};

const HoundNavigatorDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Hotels" drawerPosition="right">
        <Drawer.Screen name="Hotels" component={HomeStackNavigator} />
        <Drawer.Screen name="Favorites" component={FavoriteStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const HoundNavigatorTab = () => {
  return (
    <NavigationContainer>
      <HomeTabNavigator />
    </NavigationContainer>
  );
};

const HoundNavigator = HoundNavigatorTab;

export default HoundNavigator;
