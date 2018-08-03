var Rebase = require('re-base');
var firebase = require('firebase/app');
var database = require('firebase/database');

var app = firebase.initializeApp({
  apiKey: 'AIzaSyDFvoO-va43a4rIuTtZAZaTdgbsXXzX5ks',
  authDomain: 'hajj-hackathon-934f3.firebaseio.com/',
  databaseURL: 'https://hajj-hackathon-934f3.firebaseio.com',
  projectId: 'musosoap',
  storageBucket: "hajj-hackathon-934f3.appspot.com",
  messagingSenderId: "515270280955"
});

var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;

