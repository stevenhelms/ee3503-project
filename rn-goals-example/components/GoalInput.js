import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Modal } from "react-native";

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState("");

  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal('');
  }

  return (
      <Modal visible={props.visible} animationType="slide">
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Course Goal"
                style={styles.input}
                onChangeText={goalInputHandler}
                value={enteredGoal}
            />
            <View style={styles.inputButtonContainer}>
                <View style={styles.inputButton}><Button title="Cancel" color="red" onPress={props.onCancel} /></View>
                <View style={styles.inputButton}><Button title="Add" onPress={addGoalHandler} /></View>
            </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginBottom: 20
  },
  inputButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%'
  },
  inputButton: {
      width: '40%'
  }
});

export default GoalInput;
