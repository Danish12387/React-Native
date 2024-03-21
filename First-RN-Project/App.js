import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import Camera from './components/Camera';

export default function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  function addTodo(url) {
    const copyList = [...photos];
    copyList.push(url)
    setPhotos(copyList);
  }

  return (
    <View style={styles.container}>
      {isCameraOpen ?
        <Camera func={addTodo} />
        :
        <View style={styles.todoMainView}>
          <View>
            <Text style={{ fontSize: 32, textAlign: 'center' }}>Photos List</Text>
            <ScrollView>
              <View style={styles.list}>
                {photos.map((item, index) => {
                  return <View style={{ padding: 10 }} key={index}>
                    <Image
                      style={{ width: 340, height: 500 }}
                      source={{ uri: item }}
                    />
                  </View>
                })}
              </View>
            </ScrollView>
          </View>
        </View>}
      <View style={{ width: '100%', alignItems: 'center', padding: 30 }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setIsCameraOpen(!isCameraOpen)}
        >
          <Text style={styles.buttonText}>{!isCameraOpen ? 'Open Camera' : 'Close Camera'}</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  todoMainView: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 50
  },
  buttonContainer: {
    width: 340,
    height: 50,
    backgroundColor: '#007de3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  button: {

  },
  buttonText: {
    color: 'white',
    fontSize: 17
  },
  list: {
  },
  todoINput: {
    fontSize: 20,
    margin: 10
  }
});

