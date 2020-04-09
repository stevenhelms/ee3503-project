import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "react-native/Libraries/NewAppScreen";

const HomeScreen = (props) => {
  const hotels = useSelector((state) => state.hotels.allHotels);

  const selectHotelHandler = (id) => {
    props.navigation.navigate("Details",{ id: id });
  };

  const renderItemHandler = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => {selectHotelHandler(item.id)}} useForeground>
          <Text style={styles.listItemContent}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        keyExtractor={(item, index) => item.id.toString()}
        data={hotels}
        renderItem={renderItemHandler}
      />
    </View>
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
