import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

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

// Only this account may access the dashboard — checked again after login
// in App.jsx, since anyone with the project's public API key could
// otherwise attempt to sign in as a different Firebase Auth user.
export const ADMIN_EMAIL = 'developermaximus@gmail.com';

export function adminSignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function adminSignOut() {
  return signOut(auth);
}
