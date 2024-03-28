import { View, Text, Button } from "react-native";

const CarSelection = ({ route }) => {
    const { pickup, destination } = route.params;
    const fares = {
        bike: 50,
        car: 120,
        helicopter: 720,
        spaceShip: 1500
    }

    const checkFares = (vehicle) => {
        const baseFare = fares[vehicle];
        const { latitude: pickupLat, longitude: pickupLong } = pickup.geocodes.main;
        const { latitude: destLat, longitude: destLong } = destination.geocodes.main;
        const distance = calcCrow(pickupLat, pickupLong, destLat, destLong)
        const paisay = 'Rs.' + Math.round(distance * baseFare);
        alert(paisay);
        alert(Math.round(distance) + 'Km')
    }

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Pickup: {pickup.name}, {pickup.location.address}</Text>
            <Text>Destination: {destination.name}, {destination.location.address}</Text>

            <Button onPress={() => checkFares('bike')} title="Bike" />
            <Button onPress={() => checkFares('car')} title="Car" />
            <Button onPress={() => checkFares('helicopter')} title="Helicopter" />
            <Button onPress={() => checkFares('spaceShip')} title="Space Ship" />
        </View>
    )
}

export default CarSelection;