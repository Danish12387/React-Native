import { View, Button, StyleSheet, Text } from 'react-native';

function Dashboard() {
    
    return <View style={styles.container}>
        <Button color='red' title='Take a Ride' />
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