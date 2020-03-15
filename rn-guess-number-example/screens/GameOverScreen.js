import React from "react";
import { View, StyleSheet, Button, Image, Text, Dimensions, ScrollView } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from '../components/MainButton';
import Colors from "../constants/colors";

const GameOverScreen = props => {
  return (
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is Over.</TitleText>
      <View style={styles.imageContainer}>
        <Image
          //   source={require("../assets/success.png")}
          source={{
            uri:
              "https://cdn.tinybuddha.com/wp-content/uploads/2015/09/Success.png"
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.guessRounds}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </BodyText>
      </View>

      <MainButton onPress={props.onRestart}>New Game?</MainButton>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').width * .7,
    height: Dimensions.get('window').width * .7,
    borderRadius: Dimensions.get('window').width * .7 / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get('window').height / 30
  },
  image: {
    width: "100%",
    height: "100%"
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "roboto-bold"
  },
  resultContainer: {
    width: "80%",
    marginVertical: Dimensions.get('window').height / 60
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get('window') < 400 ? 16 : 20
  }
});

export default GameOverScreen;
