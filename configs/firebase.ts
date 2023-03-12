import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyByYcuzVSUtm2PyGUxHJp8XrzHCBmeTfbU",
  authDomain: "basicredux-38229.firebaseapp.com",
  projectId: "basicredux-38229",
  storageBucket: "basicredux-38229.appspot.com",
  messagingSenderId: "924041739084",
  appId: "1:924041739084:web:7c547340d486bb87bb6de9",
  measurementId: "G-ZHS8BSRG2V"
};

export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);