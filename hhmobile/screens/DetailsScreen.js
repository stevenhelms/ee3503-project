import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const ShowHotel = (props) => {
  return (
    <View style={styles.hotelInfo}>
      <Text style={styles.hotelName}>{props.data.name}</Text>
      <View>
        <Text style={styles.details}>
          Phone number: {props.data.phone_number}
        </Text>
        <Text style={styles.details}>Address: {props.data.address}</Text>
      </View>
    </View>
  );
};

const DetailsScreen = (props) => {
  const hotels = useSelector((state) => state.hotels.allHotels);

  let hotelId = -1;
  if (typeof props.route.params != "undefined") {
    hotelId = props.route.params["id"];
  }

  let currentHotel = useSelector((state) =>
    state.hotels.allHotels.find((hotel) => hotel.id == hotelId)
  );

  const [thisHotel, setThisHotel] = useState(currentHotel);

  const getRandomHotel = () => {
    let randomNum = Math.floor(Math.random() * hotels.length + 1);
    console.log(randomNum);
    setThisHotel(hotels[randomNum]);
  };

  return (
    <View style={styles.screen}>
      <ShowHotel data={thisHotel} />
      <Button
        title="Random Hotel"
        style={{ marginTop: 40 }}
        onPress={() => getRandomHotel()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  hotelInfo: {
    marginVertical: 20,
    marginHorizontal: 5,
  },
  hotelName: {
    alignItems: "center",
    fontSize: 24,
    fontFamily: "montserrat-bold",
    marginBottom: 15,
  },
  details: {
    fontSize: 16,
    fontFamily: "montserrat",
    color: "#333333",
  },
});

export default DetailsScreen;
