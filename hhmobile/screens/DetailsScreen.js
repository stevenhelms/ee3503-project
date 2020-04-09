import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

const DetsilsScreen = (props) => {
  // console.log(props.route);
  let hotelId = -1;
  if (typeof props.route.params != "undefined") {
    hotelId = props.route.params["id"];
  }

  const thisHotel = useSelector((state) =>
    state.hotels.allHotels.find((hotel) => hotel.id == hotelId)
  );

  //   console.log(thisHotel);

  return (
    <View style={styles.screen}>
      <Text>{thisHotel.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetsilsScreen;
