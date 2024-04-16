import { View, Button, StyleSheet, Text, } from 'react-native';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';

function Pickup({ navigation }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [snap, setSnap] = useState();
    const bottomSheetRef = useRef();
    const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

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

    return <View style={styles.container}>
        <MapView
            region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                longitudeDelta: 0.0009,
                latitudeDelta: 0.0009
            }}
            loadingEnabled={true}
            style={styles.map} >
            <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }}
                title={"My location"}
            />
        </MapView>
        <View style={styles.bottomSheetContainer}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                detached={true}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome </Text>
                </BottomSheetView>
            </BottomSheet>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    bottomSheetContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        padding: 24,
        width: '100%',
        height: '50%'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default Pickup;
