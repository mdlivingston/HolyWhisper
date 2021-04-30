import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { allowNotificationKey, getString, storeString } from './LocalStorage';
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
    const allowNotif = await getString(allowNotificationKey)

    if (enabled && !allowNotif) // Has permission and has not locally stored allow notifs string
    {
        await storeString(allowNotificationKey, 'true')
        console.log('Authorization status:', authStatus);
    }

    return enabled
}

export const handleFirebaseInit = async () =>
{
    await requestUserPermission()
    let token = await messaging().getToken();
    console.log('Firebase Message Token:', token)

    const unsubscribe = messaging().onMessage(async remoteMessage =>
    {
        console.log('Firebase Message Arrived!')
        //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
}

export const lastActive = async (currentUser, fcmToken) =>
{
    try
    {
        if (fcmToken)
            await db.lastActive.doc(currentUser.uid)
                .set({
                    uid: currentUser.uid,
                    lastActive: db.getCurrentTimeStamp(),
                    fcmToken: fcmToken
                }, { merge: true }).then(() => console.log('Last Active Recorded'))
        else
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