import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ride from '../views/Ride';
import Dashboard from '../views/Dashboard';

const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: true
            }}>
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Ride" component={Ride} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default MainNavigator;