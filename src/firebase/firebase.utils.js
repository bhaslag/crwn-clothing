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

export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt =  new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additonalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } ,{});
}

//mimicking functionality if not using firebase
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}

//export firebase function methods
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//create google authentication utility from auth library
export const googleProvider = new firebase.auth.GoogleAuthProvider();
//trigger google pop up whenever we use google auth provider
googleProvider.setCustomParameters({ prompt: 'select_account' })
//we specify that we want the google pop up, no others
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;