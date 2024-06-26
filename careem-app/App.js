import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/index';
import MainNavigator from './src/config/navigation';

export default function App() {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainNavigator />

        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: 'red'
  },
  input: {
    width: 150,
    height: 70,
    borderWidth: 4
  }
})
