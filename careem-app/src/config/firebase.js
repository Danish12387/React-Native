import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, onSnapshot, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDXEZiGGs_WrMM2H56ZAvAcvR0lcA9O1sE",
    authDomain: "careem-app-d6314.firebaseapp.com",
    projectId: "careem-app-d6314",
    storageBucket: "careem-app-d6314.appspot.com",
    messagingSenderId: "1097521943680",
    appId: "1:1097521943680:web:2d96a2e9bad2ee2e364265",
    measurementId: "G-1PTEZNDC85"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const requestARide = async (rideRqust) => {
    await addDoc(collection(db, "Rides"), {
        ...rideRqust
    });
}

function getStatus(callback, time) {
    const ridesRef = collection(db, 'Rides');
    try{
        const q = query(ridesRef, where("timeStamp", "==", time));
        onSnapshot(q, (querySnapshot) => {
            let status;
            querySnapshot.forEach((doc) => {
                status = doc.data().status;
            });
            callback(status);
        })
    }
    catch (e) {
        console.log(e.message)
    }
}

export { requestARide, getStatus }