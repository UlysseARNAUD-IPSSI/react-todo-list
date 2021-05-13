import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB6qdEbO7i44dLczVsbN5wQhpAt9BIZIZU",
    authDomain: "react-todo-list-656bd.firebaseapp.com",
    projectId: "react-todo-list-656bd",
    storageBucket: "react-todo-list-656bd.appspot.com",
    messagingSenderId: "234487312467",
    appId: "1:234487312467:web:48f90a9827baf648a156a6"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase