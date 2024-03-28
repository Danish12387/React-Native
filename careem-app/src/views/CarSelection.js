import { View, Text, Button } from "react-native";

const Destination = ({navigation}) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>Select the Vehicle!</Text>
            <Button title="Go Back" onPress={()=> navigation.navigate('Dashboard')} />
        </View>
    )
}

export default Destination
