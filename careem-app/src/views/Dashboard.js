import { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getStatus } from "../config/firebase";

function Dashboard({ navigation }) {
    const [currentStatus, setStatus] = useState();
    const timeStamps = useSelector(state => { return state.value });

    // useEffect(() => {
    //     getStatus((status) => {
    //         setStatus(status)
    //     }, timeStamps)
    // }, [timeStamps])

    // if(timeStamps) {
    //     navigation.navigate("CarSelection");
    // }

    return <View style={styles.container}>
        <Button color='red' title='Take a Ride' onPress={() => navigation.navigate("Pickup")} />
        {timeStamps && <Text>Your Ride Request: {currentStatus ? currentStatus : 'Pending'}</Text>}
        <Text>This is Dashboard</Text>
    </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Dashboard;
