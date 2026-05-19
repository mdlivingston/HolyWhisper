import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDV4hmteKUFFLjg5BwC7mEjmHso0H2x6Oo",
  authDomain: "holywhisperapp.firebaseapp.com",
  projectId: "holywhisperapp",
  storageBucket: "holywhisperapp.appspot.com",
  messagingSenderId: "743436655238",
  appId: "1:743436655238:ios:112f8ac5ed6977d1988f07"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Sign in anonymously so Firestore rules see an authenticated uid
export const authReady = new Promise((resolve, reject) => {
  signInAnonymously(auth)
    .then(() => {
      onAuthStateChanged(auth, user => {
        if (user) resolve(user);
      });
    })
    .catch(reject);
});
