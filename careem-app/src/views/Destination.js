import { View, Text, Button } from "react-native";

const Destination = ({navigation}) => {

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>This is Destination!</Text>
            <Button title="Select Vehicle" onPress={()=> navigation.navigate('CarSelection')} />
        </View>
    )
}

export default Destination
