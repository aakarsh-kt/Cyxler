// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAhJJIYF1RxS65IW2W_ocsMbgjT_n2nPpc",
  authDomain: "cyxler.firebaseapp.com",
  projectId: "cyxler",
  storageBucket: "cyxler.appspot.com",
  messagingSenderId: "918439554829",
  appId: "1:918439554829:web:198c79dc04681f53dd8a44",
  measurementId: "G-9NCZ5LG9W7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const bd=getDatabase(app);
export const Collection = collection(db, "CyclesColl");
export const MarkerCollection=collection(db,"Markers");   
export const Users = collection(db, "Users");
export const Chats = collection(db, "Chats");
export const eventCollection = collection(db, "Events");
export const questionCollection=collection(db,"Questions");
export const grpCollection=collection(db,"Groups");
