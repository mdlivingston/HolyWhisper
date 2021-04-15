var admin = require('firebase-admin');

var serviceAccount = require("/Users/developermaximus/Code/HolyWhisper/fcmFunction/holywhisperapp-firebase-adminsdk-lmwp0-5f0717a9b3.json");
var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
//console.log(app)

// This registration token comes from the client FCM SDKs.
var registrationToken = 'fT3_o5KCBU0Sk61WmR8YP2:APA91bG84VbrXQQVtjY1aoOl_m1kFTuBNSNZEwryRk24tPrvbI-kcbGvQ0VkbNEYu2Grlo3GLxNaonx67ABbMfMQ1iqgx-O-BvHX1aEujXqOauO8G0DY7ELDFMD7nofYzB4ZOWhK262l';

var message = {
    "notification": {
        "title": "Portugal vs. Denmark",
        "body": "Hello hello hello hello hello hello hello!"
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