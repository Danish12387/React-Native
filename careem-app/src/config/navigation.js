import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import Dashboard from '../views/Dashboard';
import Pickup from '../views/Pickup';
import Destination from '../views/Destination';
import CarSelection from '../views/CarSelection';
import Chats from '../views/Chats'
import Status from '../views/Status'
import Calls from '../views/Calls'
import RideHistory from '../views/RideHistory'
import RideHistoryDetails from '../views/RideHistoryDetails'
import OnARide from '../views/OnARide'

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();


function MainNavigator() {
    const currentStatus = useSelector(state => { return state.value });
    console.log('from navigation', currentStatus);

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                {currentStatus.isClicked ?
                    <Drawer.Screen name="Home" component={StackNavigator2} />
                    :
                    <Drawer.Screen name="Home" component={StackNavigator} />
                }
                <Drawer.Screen name="Ride History" component={RideHistoryfunc} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
// 
function StackNavigator() {
    return (

        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Pickup" component={Pickup} />
            <Stack.Screen name="Destination" component={Destination} />
            <Stack.Screen name="CarSelection" component={CarSelection} />
        </Stack.Navigator>

    );
}

function StackNavigator2() {
    return (

        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="OnARide" component={OnARide} />
        </Stack.Navigator>

    );
}

function RideHistoryfunc() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Ride History" component={RideHistory} />
            <Stack.Screen name="RideHistoryDetails" component={RideHistoryDetails} />
        </Stack.Navigator>
    )
}

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Chats" component={Chats} />
            <Tab.Screen name="Status" component={Status} />
            <Tab.Screen name="Calls" component={Calls} />
        </Tab.Navigator>
    )
}

export default MainNavigator;