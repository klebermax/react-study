import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCfrZSvTmzS2nWGLQ_0he2vAra6a266Qk8',
  authDomain: 'm-city-463aa.firebaseapp.com',
  databaseURL: 'https://m-city-463aa.firebaseio.com',
  projectId: 'm-city-463aa',
  storageBucket: 'm-city-463aa.appspot.com',
  messagingSenderId: '53343953067'
};

firebase.initializeApp(config);

const firebaseDb = firebase.database();
const firebaseMatches = firebaseDb.ref('matches');
const firebasePromotions = firebaseDb.ref('promotions');
const firebaseTeams = firebaseDb.ref('teams');
const firebasePlayers = firebaseDb.ref('players');

export { firebase, firebaseMatches, firebasePromotions, firebaseTeams, firebasePlayers, firebaseDb };
