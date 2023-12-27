import { initializeApp } from '/firebase/app';
import { getAnalytics } from '/firebase/analytics';
import { getFirestore, doc, getDoc } from '/firebase/firestore';
import { getStorage } from '/firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBk_EKsQwaN9jAgoDeRGEDSzzOewD0T__g",
    authDomain: "capstone-810c4.firebaseapp.com",
    databaseURL: "https://capstone-810c4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "capstone-810c4",
    storageBucket: "capstone-810c4.appspot.com",
    messagingSenderId: "1050127576221",
    appId: "1:1050127576221:web:28913ba31038ea1e277874",
    measurementId: "G-3MGYQPLMRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage();

const docRef = doc(db, "cities", "SF");

async function getCityData() {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}

// Call the function to get city data
getCityData();
