import React import 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import Colors from '../constants/colors';

const defaultStackNavigationOptions = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.green : ""
        },
        headerTitleStyle: {
            fontFamily: "montserrat-bold",
            fontSize: 28,
        },
        headerBackTitleStyle: {
            fontFamily: "montserrat",
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.green,
        headerTitle: 'Hotel Hound'
}


const HomeNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                headerTitle: 'Hotel Hound'
            },
        }
    },
    {
        defaultNavigationOptions: defaultStackNavigationOptions
    }
);

const DetailNavigator = createStackNavigator(
    {
        Details: DetailsScreen,
        navigationOptions: {
            headerTitle: 'Details'
        },
    },
    {
        defaultNavigationOptions: defaultStackNavigationOptions
    }
);

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        navigationOptions: {
            headertitle: 'Favorite Hotels'
        }
    },
    {
        defaultNavigationOptions: defaultStackNavigationOptions
    }
);

