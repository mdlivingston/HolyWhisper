/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import
{
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert,
    Button,
    Animated
} from 'react-native';

import
{
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFire, faCog } from '@fortawesome/free-solid-svg-icons'

import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Settings from './pages/Settings';
import AddWhisper from './pages/AddWhisper';

const Stack = createStackNavigator();

export default function App()
{
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() =>
    {
        setTimeout(() =>
        {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true // Add This line
                },
            ).start();
        }, 2000)

    }, [fadeAnim])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen name="Home" options={({ navigation, route }) => (
                    {
                        title: '',
                        headerTransparent: true,
                        headerRight: () => (
                            <Animated.View style={{ opacity: fadeAnim }}>
                                <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings', { name: 'Jane' })}>
                                    <FontAwesomeIcon size={20} icon={faCog} />
                                </TouchableOpacity>
                            </Animated.View>
                        ),
                    })} component={Home} />

                <Stack.Screen name="Settings" options={{
                    headerTransparent: false,
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }} component={Settings} />

                <Stack.Screen name="AddWhisper" options={{
                    title: "Add Whisper",
                    headerTransparent: false,
                    headerBackTitleVisible: false,
                    headerTintColor: 'black'
                }} component={AddWhisper} />

            </Stack.Navigator>
            <StatusBar barStyle="dark-content" />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        // backgroundColor: 'red'
    },
    button: {
        alignItems: "center",
        // backgroundColor: Colors.dark,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        width: '50%',
        borderRadius: 5,
        justifyContent: 'center',
    },
    lightText: {
        fontSize: 20
        // color: 'white',
    },
    settingsIcon: {
        paddingRight: 30,
        // paddingTop: 30
        // position: 'absolute',
        // top: 70,
        // right: 20
    }
});


