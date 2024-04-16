import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import MainNavigator from './src/config/navigation';

export default function App() {

  return (
    <View style={styles.container}>
      <MainNavigator />

      <StatusBar style="auto" />
    </View>
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
