import { addDays } from 'date-fns';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { getString, reminderTime } from '../helpers/LocalStorage';
import { getRandomWhisper, truncate } from '../helpers/Randomizer';
import NotificationHandler from './NotificationHandler';
export default class NotificationService
{
    constructor(onRegister, onNotification, navigation)
    {
        this.lastId = 0;
        this.lastChannelCounter = 0;
        this.goToWhisper = navigation

        this.createDefaultChannels();

        NotificationHandler.attachRegister(onRegister);
        NotificationHandler.attachNotification(onNotification);
        NotificationHandler.attachNavagation(navigation);

        PushNotification.getChannels(function (channels)
        {
            //console.log(channels);
        });
    }

    popInitialNotification()
    {
        PushNotification.popInitialNotification((notification) =>
        {
            console.log('InitialNotication:', notification)
            PushNotification.setApplicationIconBadgeNumber(0);
            if (notification)
                this.goToWhisper.navigate('ShowWhisper', { forcedWhisper: notification.data.whisper })

        });
    }

    localNotif(soundName)
    {
        this.lastId++;
        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
            ticker: 'My Notification Ticker', // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
            subText: 'This is a subText', // (optional) default: none
            color: 'red', // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: 'group', // (optional) add group to message
            groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            actions: ['Read'], // (Android only) See the doc for notification actions to know more
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

            /* iOS only properties */
            category: '', // (optional) default: empty string

            /* iOS and Android properties */
            id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: 'Local Notification', // (optional)
            message: 'My Notification Message', // (required)
            userInfo: { screen: 'home' }, // (optional) default: {} (using null throws a JSON value '<null>' error)
            sound: true, // (optional) default: true
            soundName: 'shofar.mp3', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        });
    }

    scheduleNotif(date, title, message, soundName, whisper)
    {
        this.lastId++;
        PushNotification.localNotificationSchedule({
            date: new Date(date),

            /* Android Only Properties */
            channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
            //ticker: 'My Notification Ticker', // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            //bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
            //subText: 'This is a subText', // (optional) default: none
            color: 'blue', // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: 'group', // (optional) add group to message
            groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            actions: ['Read'], // (Android only) See the doc for notification actions to know more
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

            /* iOS only properties */
            category: '', // (optional) default: empty string

            /* iOS and Android properties */
            id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: title, // (optional)
            message: message, // (required)
            userInfo: { whisper }, // (optional) default: {} (using null throws a JSON value '<null>' error)
            sound: true, // (optional) default: true
            soundName: soundName, // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        });
    }
    schedule5Notif(date, title, message, soundName, whisper)
    {
        this.lastId++;
        PushNotification.localNotificationSchedule({
            date: new Date(Date.now() + 5 * 1000), // in 30 secs
            /* Android Only Properties */
            channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
            //ticker: 'My Notification Ticker', // (optional)
            autoCancel: true, // (optional) default: true
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            //bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
            //subText: 'This is a subText', // (optional) default: none
            color: 'blue', // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: 'group', // (optional) add group to message
            groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            actions: ['Read'], // (Android only) See the doc for notification actions to know more
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

            /* iOS only properties */
            category: '', // (optional) default: empty string

            /* iOS and Android properties */
            id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: title, // (optional)
            message: message, // (required)
            userInfo: { whisper }, // (optional) default: {} (using null throws a JSON value '<null>' error)
            sound: true, // (optional) default: true
            soundName: 'shofar.mp3', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        });
    }

    async fillScheduledNotifications()
    {
        this.cancelAll();

        for (let i = 0; i < 30; i++) 
        {
            var defaultTime = addDays(new Date(Date.now()), i)
            defaultTime.setHours(7);
            defaultTime.setMinutes(0);
            defaultTime.setSeconds(0)
            defaultTime.setMilliseconds(0);

            const localReminderTime = await getString(reminderTime)

            if (localReminderTime)
            {
                const reminderDate = new Date(localReminderTime);
                defaultTime.setHours(reminderDate.getHours());
                defaultTime.setMinutes(reminderDate.getMinutes());
            }

            const randomWhisper = await getRandomWhisper()

            if (defaultTime >= new Date())
                this.scheduleNotif(defaultTime, 'Your Daily Whisper Has Arrived! 🔥', `${truncate(randomWhisper.text, 100)} ${randomWhisper.verse}`, 'default', randomWhisper)
            //this.scheduleNotif(defaultTime, 'Your Daily Whisper Has Arrived! 🔥', `Tap to recieve it!`, 'default', {})
        }
    }

    checkPermission(cbk)
    {
        return PushNotification.checkPermissions(cbk);
    }

    requestPermissions()
    {
        return PushNotification.requestPermissions();
    }

    cancelNotif()
    {
        PushNotification.cancelLocalNotifications({ id: '' + this.lastId });
    }

    cancelAll()
    {
        PushNotification.cancelAllLocalNotifications();
    }

    abandonPermissions()
    {
        PushNotification.abandonPermissions();
    }

    getScheduledLocalNotifications(callback)
    {
        PushNotification.getScheduledLocalNotifications(callback);
    }

    createDefaultChannels()
    {
        PushNotification.createChannel(
            {
                channelId: "default-channel-id", // (required)
                channelName: `Default channel`, // (required)
                channelDescription: "A default channel", // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
        PushNotification.createChannel(
            {
                channelId: "sound-channel-id", // (required)
                channelName: `Sound channel`, // (required)
                channelDescription: "A sound channel", // (optional) default: undefined.
                soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel 'sound-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    createOrUpdateChannel()
    {
        this.lastChannelCounter++;
        PushNotification.createChannel(
            {
                channelId: "custom-channel-id", // (required)
                channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
                channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }
}