import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDRoB9zvhHKZRGe-Uk08kJm_ZTYGvJ5ess",
    authDomain: "todolist-c4ff5.firebaseapp.com",
    databaseURL: "https://todolist-c4ff5.firebaseio.com",
    projectId: "todolist-c4ff5",
    storageBucket: "todolist-c4ff5.appspot.com",
    messagingSenderId: "973950547140",
    appId: "1:973950547140:web:4367a8bd25fce5919c0591",
    measurementId: "G-ZBSQY9Z985"
}

export default firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()