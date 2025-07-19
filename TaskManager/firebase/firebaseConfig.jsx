import { initializeApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBcG4d5oEisQ3DTiDErAZ0b-7Q1TRus-gQ",
    authDomain: "task-management-app-c86cd.firebaseapp.com",
    projectId: "task-management-app-c86cd",
    messagingSenderId: "712137882103",
    appId: "1:712137882103:android:870facfa59b972a7ce16f2"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const firestore = getFirestore(app)


export { auth, firestore };