import { View, Button, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function Ride({ route }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const { latitude: pikupLat, longitude: pickupLong } = route.params.Ride.pickup.geocodes.main;
    const { latitude: destinationLat, longitude: destinationLong } = route.params.Ride.destination.geocodes.main;

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 1,
                timeInterval: 1000
            }, (location) => {
                setLocation(location)
            });
        })();
    }, []);

    if (!location) return <Text>{errorMsg || "Location needs your permission"}</Text>

    return <View style={{ flex: 1, justifyContent: 'center' }}>
        <MapView
            region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                // longitudeDelta: 0.049,
                // latitudeDelta: 0.049
            }}
            style={styles.map} >
            <View style={{ width: 46, height: 48 }}>
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    }}
                    image={{ uri: 'https://cdn-icons-png.flaticon.com/512/5193/5193688.png' }}
                    // style={{ width: 48, height: 48 }}
                    title={"Your Location"}
                />
            </View>
            <Marker
                coordinate={{
                    latitude: pikupLat,
                    longitude: pickupLong
                }}
                title={"Pickup Location"}
            />
            <Marker
                coordinate={{
                    latitude: destinationLat,
                    longitude: destinationLong
                }}
                image={'https://cdn2.iconfinder.com/data/icons/social-messaging-1/512/18-512.png'}
                title={"Destination location"}
            />
        </MapView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    button: {
        position: 'absolute',
        bottom: 0,
        width: '92%',
        height: 60,
        backgroundColor: '#6495ED',
        margin: 15,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10
    }
});

export default Ride;
