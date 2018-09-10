import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
  // Your config here bro
};

firebase.initializeApp(config);

const firebaseDb = firebase.database();
const firebaseMatches = firebaseDb.ref('matches');

export { firebaseMatches };
