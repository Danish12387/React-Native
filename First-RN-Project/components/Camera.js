import { Camera, CameraType } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function App({func}) {
    const [image, setImage] = useState();
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [permissionResponse, requestMediaPermission] = MediaLibrary.usePermissions();
    const cameraRef = useRef();

    useEffect(() => {
        requestMediaPermission();
    }, []);

    if (!permission) {
        return <Text>No permission</Text>;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function snapPhoto() {
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo);
        func(photo.uri);
        Alert.alert('Photos List', 'Added to your Photos List!');

        if (permissionResponse.granted) {
            await MediaLibrary.saveToLibraryAsync(photo.uri);
        }
    }

    return (
        <View style={styles.container}>
            {image ?
                <View>
                    <Image
                        style={{ width: '100%', height: '95%' }}
                        source={{ uri: image.uri }}
                    />
                    <Button onPress={() => setImage(null)} title='Take Picture' />
                </View>
                :
                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Image
                                style={styles.icon}
                                source={{ uri: 'https://icons.veryicon.com/png/o/application/designe-editing/flip-camera-2.png' }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={snapPhoto}>
                            <Image
                                style={styles.icon}
                                source={{ uri: 'https://static-00.iconduck.com/assets.00/snap-icon-2048x2048-hs6u6g2k.png' }}
                            />
                        </TouchableOpacity>
                    </View>
                </Camera>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        margin: 20,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'left',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    icon: {
        height: 80,
        width: 80,
    }
});
