import { View, Button, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function Destination({ navigation, route }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [places, setPlaces] = useState([]);
    const [isPlaces, setIsPlaces] = useState(false);
    const [isEmpty, setIsEmpty] = useState();
    const { pickup } = route.params;    

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

    const search = (text) => {
        if (text) {
            setIsPlaces(true)
        } else {
            setIsPlaces(false)
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'fsq3ikpnd/sAM5fHsPyOVgSp9mV7qHymeVwKaqjpi3LCgLw='
            }
        };

        const { latitude, longitude } = location.coords;
        console.log('latitude', latitude);
        console.log('longitude', longitude);
        console.log('text', text);

        fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}`, options)
            .then(response => response.json())
            .then(response => {
                if (response.results.length !== 0) {
                    setPlaces(response.results)
                    setIsEmpty(false)
                } else {
                    setIsEmpty(true)
                    setPlaces([])
                }
            })
            .catch(err => console.error(err));
    }

    return <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{height: 60, fontSize: 16, textAlign: 'center', marginTop: 60, padding: 10}}>Pickup: {pickup.name}, {pickup.location.address}</Text>
        <MapView
            region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                longitudeDelta: 0.0009,
                latitudeDelta: 0.0009
            }}
            style={styles.map} >
            <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }}
                title={"My location"}
            />
        </MapView>
        <View style={styles.searchContainer}>
            <TextInput style={styles.search} placeholder='Search location...' onChangeText={search} />
            {isPlaces &&
                <ScrollView style={styles.placesContainer}>
                    {isEmpty && <Text style={{ height: 40, width: "100%", fontSize: 16, textAlign: 'center' }}>No results found!</Text>}
                    {places.map((item, index) => {
                        return <TouchableOpacity style={styles.placesButton} key={index} onPress={() => navigation.navigate("CarSelection", { pickup, destination: item })}>
                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                            <Text style={{ fontSize: 10, color: '#B8B8B8' }}>{item.location.address}</Text>
                        </TouchableOpacity>
                    })}
                </ScrollView >
            }
        </View>
        <View style={styles.button}>
            <Text style={{ fontSize: 16 }}>Type a location in search box and select your destination.</Text>
        </View>
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
    },
    search: {
        width: '95%',
        height: 55,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        fontSize: 16
    },
    searchContainer: {
        position: 'absolute',
        top: 70,
        width: '100%',
        flex: 1,
        alignItems: 'center'
    },
    placesContainer: {
        width: '95%',
        maxHeight: 450,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        padding: 10
    },
    placesButton: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        // borderRadius: 10,
    }
});

export default Destination;
