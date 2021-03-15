import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { allowNotificationKey, storeString } from './LocalStorage';
import firestore from '@react-native-firebase/firestore';

export const db = {
    prayers: firestore().collection('Prayers'),
    lastActive: firestore().collection('LastActive'),
    feedback: firestore().collection('Feedback'),
    favoriteWhispers: firestore().collection('FavoriteWhispers'),
    formatDoc: doc =>
    {
        return {
            id: doc.id,
            ...doc.data(),
        }
    },
    getCurrentTimeStamp: firestore.FieldValue.serverTimestamp
}

export async function requestUserPermission()
{
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled)
    {
        await storeString(allowNotificationKey, 'true')
        console.log('Authorization status:', authStatus);
    }
    else 
    {
        await storeString(allowNotificationKey, 'false')
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
        //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
}

export const lastActive = async (currentUser) =>
{
    try
    {
        await db.lastActive.doc(currentUser.uid)
            .set({
                uid: currentUser.uid,
                lastActive: db.getCurrentTimeStamp()
            }, { merge: true }).then(() => console.log('Last Active Recorded'))
    }
    catch (e)
    {
        console.error('LastActive update failed.' + e)
    }
}