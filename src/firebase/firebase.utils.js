import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC2CsP-8P6Ut-fc1TTRVFQVqkpsScO9i2M",
  authDomain: "crwn-db-b0e3b.firebaseapp.com",
  databaseURL: "https://crwn-db-b0e3b.firebaseio.com",
  projectId: "crwn-db-b0e3b",
  storageBucket: "crwn-db-b0e3b.appspot.com",
  messagingSenderId: "9507927179",
  appId: "1:9507927179:web:c3a8ac4126fe6ec877508e"
};

firebase.initializeApp(config);

//export firebase function methods
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//create google authentication utility from auth library
const provider = new firebase.auth.GoogleAuthProvider();
//trigger google pop up whenever we use google auth provider
provider.setCustomParameters({ prompt: 'select_account' })
//we specify that we want the google pop up, no others
export const signInWithGoogle  = () => auth.signInWithPopup(provider)

export default firebase;