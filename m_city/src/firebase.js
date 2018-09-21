import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {};

firebase.initializeApp(config);

const firebaseDb = firebase.database();
const firebaseMatches = firebaseDb.ref('matches');
const firebasePromotions = firebaseDb.ref('promotions');
const firebaseTeams = firebaseDb.ref('teams');
const firebasePlayers = firebaseDb.ref('players');

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers,
  firebaseDb
};
