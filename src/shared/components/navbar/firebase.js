 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseconfig";
const firebaseApp = initializeApp(firebaseConfig);
const firebase = getAuth(firebaseApp);
export default firebase;
