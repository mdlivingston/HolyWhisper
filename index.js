/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import TrackPlayer from 'react-native-track-player';


//add this line to register the TrackPlayer
TrackPlayer.registerPlaybackService(() => require('./service.js'));
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage =>
{
    console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
