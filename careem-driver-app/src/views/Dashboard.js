import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { getRides, updateStatus } from '../config/firebase';
import { useEffect, useState } from 'react';

export default function Dashboard({ navigation }) {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        getRides(rides => {
            setRides(rides);
        });
    }, [])

    const accept = async (item) => {
        navigation.navigate("Ride", { Ride: item });
        await updateStatus(item._id, 'Accepted')
    }

    const reject = (item) => {
        updateStatus(item._id, 'Rejected')
    }

    return (
        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>
                {rides.map((item, index) => {
                    return <View style={styles.ridesContainer} key={index}>
                        <Text>Pickup: {item.pickup.name}, {item.pickup.location.address}</Text>
                        <Text>Destination: {item.destination.name}, {item.destination.location.address}</Text>
                        <View style={styles.buttonContainer}><Button title="Accept" onPress={() => accept(item)} /></View>
                        <View style={styles.buttonContainer}><Button title="Reject" onPress={() => reject(item)} /></View>
                    </View>
                })}
            </ScrollView>
            <StatusBar style="aut0" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ridesContainer: {
        // height: 100,
        padding: 10,
        width: 300,
        borderColor: 'grey',
        borderRadius: 10,
        borderWidth: 1,
        margin: 10
    },
    buttonContainer: {
        margin: 10
    }
});
