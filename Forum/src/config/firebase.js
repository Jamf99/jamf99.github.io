import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: " AIzaSyBNHH1xM8quJsRWTLpKsWvXk3h2X-3C3Q0 ",
    authDomain: "my-forum-78cac.firebaseapp.com",
    databaseURL: "https://my-forum-78cac.firebaseio.com",
    projectId: "my-forum-78cac",
    storageBucket: "my-forum-78cac.appspot.com",
    messagingSenderId: "795401244781"
};

const firebaseApp = firebase.initializeApp(config)
export default firebaseApp.firestore()