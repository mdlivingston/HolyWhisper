import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { storeString } from './LocalStorage';

export async function requestUserPermission()
{
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled)
    {
        await storeString('allowNotification', 'true')
        console.log('Authorization status:', authStatus);
    }
    else 
    {
        await storeString('allowNotification', 'false')
    }

    return enabled
}

export const handleFirebaseInit = async () =>
{
    await requestUserPermission()
    let token = await messaging().getToken();
    console.log(token)

    const unsubscribe = messaging().onMessage(async remoteMessage =>
    {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
}