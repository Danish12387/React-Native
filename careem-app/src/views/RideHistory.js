import { View, Text, Button } from 'react-native'

function RideHistory({ navigation }) {
    return <View>
        <Text>Here RideHistory will come</Text>

        <Button title="Detail" onPress={() => navigation.navigate("RideHistoryDetails")} />
    </View>
}

export default RideHistory;