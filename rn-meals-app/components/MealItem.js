import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  ImageBackground
} from "react-native";
import DefaultText from "./DefaultText";

const MealItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.mealItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
              <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                  <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
            </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
              <DefaultText>{props.duration}m</DefaultText>
              <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
              <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    flex: 1,
    height: 200,
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    marginVertical: 10,
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealHeader: {
      height: '85%',
  },
  mealDetail: {
      paddingHorizontal: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '15%',
  },
  bgImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    //   fontFamily: 'ubuntu-bold',
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
  }
});

export default MealItem;
