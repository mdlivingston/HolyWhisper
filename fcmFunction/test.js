var admin = require('firebase-admin');

var serviceAccount = require("/Users/developermaximus/Code/HolyWhisper/fcmFunction/holywhisperapp-firebase-adminsdk-lmwp0-5f0717a9b3.json");
var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
//console.log(app)

// This registration token comes from the client FCM SDKs.
var registrationToken = 'fBWgcU7MmUFyioCDDAI9OB:APA91bE2n-1WijoiQYeBvpV7dmI53hmFuuVwjckAIp4zNd9rtZmBXa3o4WchLe-g7yuqt6jHaU-1eTf6ctJN_TdNKC0PUm_q81iB9tAEFUu8HwDDxrHSGasCTVpycPDKXGBZid7wY2aX';

var message = {
    "notification": {
        "title": "Hey you bunchie!",
        "body": "I love you pickle!"
    },
    data: {
        item: 'item'
    },
    //title: 'hey',
    //message: 'hey hey',
    token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
    .then((response) =>
    {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) =>
    {
        console.log('Error sending message:', error);
    });