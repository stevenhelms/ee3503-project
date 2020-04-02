import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        paddingTop: 36,
        backgroundColor: 'green'
    },
    text: {
        color: 'white',
        fontSize: 24
    }
});

export default Header;