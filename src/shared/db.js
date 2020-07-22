import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCv0rqnZnoJjGFh4J813J_bjwyeyds5ckk',
  authDomain: 'pessoacrud.firebaseapp.com',
  databaseURL: 'https://pessoacrud.firebaseio.com',
  projectId: 'pessoacrud',
  storageBucket: 'pessoacrud.appspot.com',
  messagingSenderId: '121870450048',
  appId: '1:121870450048:web:61ca9377a904a8e1b81565',
  measurementId: 'G-E3RTBLEYTB'
}

// Get a Firestore instance
export const db = firebase
  .initializeApp(config)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true })
