import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot, query, orderBy, setDoc, doc } from "firebase/firestore";

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

function getRides(callback) {
    const ridesRef = collection(db, 'Rides');
    const q = query(ridesRef, orderBy("timeStamp", "desc"));
    try {
        onSnapshot(q, (querySnapshot) => {
            const rides = [];
            querySnapshot.forEach((doc) => {
                rides.push({ _id: doc.id, ...doc.data() })
            })
            callback(rides);
        })
    }
    catch(e) {
        console.log(e.message);
    }
}

async function updateStatus(docId, status) {
    const ref = doc(db, 'Rides', docId);
    try {
        await setDoc(ref, { status }, { merge: true })
    }
    catch (e) {
        console.log(e.message)
    }

}

export { getRides, updateStatus }