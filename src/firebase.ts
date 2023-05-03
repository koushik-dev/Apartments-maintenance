import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYS4Wai9aKuQGftM253O_cVUSp0o16YdQ",
  authDomain: "apartments-5d61e.firebaseapp.com",
  projectId: "apartments-5d61e",
  storageBucket: "apartments-5d61e.appspot.com",
  messagingSenderId: "798582304456",
  appId: "1:798582304456:web:e425ae1b6bfe707e12fffd",
};

console.log("*** Firebase Config ***", firebaseConfig);

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
