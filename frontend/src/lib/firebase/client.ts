import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBjm1w_uB3zWq2axPG5p-DRDGQO7ce36P8',
  authDomain: 'submarine-dev-111.firebaseapp.com',
  projectId: 'submarine-dev-111',
  storageBucket: 'submarine-dev-111.appspot.com',
  messagingSenderId: '1047626251556',
  appId: '1:1047626251556:web:566f88eefbb6f1f14187b1',
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const strorage = getStorage();
export const auth = getAuth();
export const db = getFirestore();
