import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from 'redux-thunk';

import hotelsReducer from "./store/reducers/hotels";
import HoundNavigator from './components/HoundNavigator';

const rootReducer = combineReducers({
  hotels: hotelsReducer
});

const dataStore = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchData = () => {
  return Font.loadAsync({
    montserrat: require("./assets/Montserrat-Regular.ttf"),
    "montserrat-bold": require("./assets/Montserrat-Bold.ttf")
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchData}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={dataStore}>
      <HoundNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
