import { View, Button } from 'react-native'

function Pickup({ navigation }) {
    return <View style={{flex: 1, justifyContent: 'center'}}>

        <Button title="Select Destination" onPress={()=> navigation.navigate("Destination")}/>
    </View>
}

export default Pickup;