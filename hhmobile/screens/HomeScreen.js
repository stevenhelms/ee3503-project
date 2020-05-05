import React, { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
// import Constants from 'expo-constants';
import Colors from "../constants/colors";
import * as hotelActions from "../store/actions/hotels";

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const hotels = useSelector((state) => state.hotels.allHotels);
  const dispatch = useDispatch();

  const loadHotels = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(hotelActions.fetchHotels());
    } catch (err) {}
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadHotels();
  }, [dispatch]);

  const selectHotelHandler = (id) => {
    props.navigation.navigate("Details", { id: id });
  };

  const renderItemHandler = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          onPress={() => {
            selectHotelHandler(item.id);
          }}
          useForeground
        >
          <Text style={styles.listItemContent}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadHotels} />
        }
        style={styles.list}
        keyExtractor={(item, index) => item.id.toString()}
        data={hotels}
        renderItem={renderItemHandler}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    padding: 10,
  },
  listItem: {
    // used on IOS
    shadowColor: Colors.primaryColor,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    borderRadius: 6,
    backgroundColor: "white",
    marginVertical: 5,
    width: "100%",
  },
  listItemContent: {
    padding: 10,
  },
});

export default HomeScreen;
