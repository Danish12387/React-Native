// screens/HomeScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.margins}>
                <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
            </View>
            <View style={styles.margins}>
                <Button title="Go to Services" onPress={() => navigation.navigate('Services')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px'
    },
    margins: {
        margin: 10
    }
});
