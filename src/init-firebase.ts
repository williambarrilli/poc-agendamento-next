import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import moment from "moment";
moment.locale("pt-BR");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const firebase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return { app, db };
};
