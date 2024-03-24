import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, View, Platform, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const { width, height } = Dimensions.get('window');

export default function ImagePickerExample() {
    const [image, setImage] = useState(null);
    const [IsImage, setIsImage] = useState(false);
    const [postsStatus, setPostsStatus] = useState([]);
    const [showStatus, setShowStatus] = useState(false);
    const [viewStatus, setViewStatus] = useState();
    const animation = useRef(new Animated.Value(0)).current;
    const myTimeoutRef = useRef(null);

    useEffect(() => {
        Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            })
        ).start();
    }, []);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setIsImage(true)
        }
    };

    function postStatus() {
        const copyList = [...postsStatus];
        copyList.push(image);
        setPostsStatus(copyList);
        setIsImage(false);
    }

    function showStat(item) {
        setShowStatus(true);
        setViewStatus(item);
        myTimeoutRef.current = setTimeout(() => {
            setShowStatus(false);
        }, 5000)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View
                style={[
                    styles.line,
                    {
                        transform: [
                            {
                                scaleX: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 330],
                                }),
                            },
                        ],
                    },
                ]}
            />
            {showStatus
                ?
                <View style={{ height: height, width: width, flex: 1, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        setShowStatus(false)
                        clearTimeout(myTimeoutRef.current);
                    }}>
                        <Image source={{ uri: viewStatus }} style={{ width: width, height: 270 }} />
                    </TouchableOpacity>
                </View>
                :
                <View>
                    {IsImage ?
                        <View style={styles.imageContainer}>
                            <View style={{ flexGrow: 1, justifyContent: 'center', marginTop: 60 }}><Image source={{ uri: image }} style={styles.image} /></View>
                            <View>
                                <View style={styles.button} ><Button title='Post Status' onPress={postStatus} /></View>
                                <View style={styles.button} ><Button onPress={() => setIsImage(false)} title='Cancel' /></View>
                            </View>
                        </View>
                        :
                        <View>
                            <Button title="Upload Status" onPress={pickImage} />
                            <View>
                                {
                                    postsStatus.map((item, index) => {
                                        return <View key={index} style={styles.statusView}>
                                            <TouchableOpacity onPress={() => showStat(item)} style={styles.touchable}>
                                                <Image style={{ height: 60, width: 60, borderRadius: 100 }} source={{ uri: item }} />
                                            </TouchableOpacity>
                                        </View>
                                    })
                                }

                            </View>
                        </View>
                    }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        width: width,
        height: height,
        margin: 20
    },
    image: {
        width: width,
        height: 270
    },
    button: {
        width: width,
        height: 50,
        paddingLeft: 50,
        paddingRight: 50,
    },
    statusView: {
        borderWidth: 5,
        borderRadius: 100,
        height: 70,
        width: 70,
        borderColor: 'green',
    },
    line: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1,
        height: 2, 
        backgroundColor: 'red',
    },
});