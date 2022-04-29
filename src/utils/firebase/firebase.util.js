import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, snapshotEqual} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGC3TDuTATqtSn348ohTO22bGSX2GpcYs",
  authDomain: "crwn-cloathing-db-17560.firebaseapp.com",
  projectId: "crwn-cloathing-db-17560",
  storageBucket: "crwn-cloathing-db-17560.appspot.com",
  messagingSenderId: "577196311124",
  appId: "1:577196311124:web:5ca71dcc34a448d1c8a3c1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Authentication
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Initialize Firestore db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email, 
        createAt
      });
    } catch(error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}