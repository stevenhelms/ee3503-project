import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigation from "./navigation/MealsNavigator";
import mealsReducer from './store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});

const dataStore = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    oxanium: require('./assets/fonts/Oxanium-Regular.ttf'),
    'oxanium-bold': require('./assets/fonts/Oxanium-Bold.ttf'),
    ubuntu: require("./assets/fonts/Ubuntu-Regular.ttf"),
    "ubuntu-bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
    raleway: require('./assets/fonts/Raleway-Regular.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return <Provider store={dataStore}><MealsNavigation /></Provider>;
}
