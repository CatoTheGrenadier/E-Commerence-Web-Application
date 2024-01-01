import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBZStFWyZ8DWUz8FBYNZdXBzRA3GCfbDmI",
  authDomain: "crwn-clothing-db-be66b.firebaseapp.com",
  projectId: "crwn-clothing-db-be66b",
  storageBucket: "crwn-clothing-db-be66b.appspot.com",
  messagingSenderId: "157454042411",
  appId: "1:157454042411:web:ad3c33dfead04259c0f16e"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
