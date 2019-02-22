import firebase from 'firebase';
import { showNotification } from '../components/HelperFunctions/Notifications';

function getFirebaseAuthObject() {
    // Configure Firebase.
    const config = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID
    };
    firebase.initializeApp(config);
    return firebase;
}
function signinWithGoogle(trackedCompanies) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        localStorage.setItem('LOAF_USER', JSON.stringify(user));
        if(!readUserCompanyData())
        {
            writeUserData(user.uid, user.displayName, user.email, user.photoURL, trackedCompanies)
        }
        else{
            window.location.reload();
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}
function updateCompanies(userId, trackedCompanies) {
    firebase.database().ref('users/' + userId).set({
        companies: trackedCompanies
    });
}

function writeUserData(userId, name, email, imageUrl, trackedCompanies) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl,
        companies: trackedCompanies
    }).then(() => {
        window.location.reload();
    });
}
function updateUserCompanyData(userId, trackedCompanies) {
    var newPostKey = firebase.database().ref().child('users').push().key;
    let updates = {};
    updates['/users/' + userId + '/companies/'] = trackedCompanies;
    firebase.database().ref().update(updates);
}
function updateUserCompanyShareData(userId, trackedCompanies, companyIndex) {
    var newPostKey = firebase.database().ref().child('users').push().key;
    let updates = {};
    updates['/users/' + userId + '/companies/'] = trackedCompanies;
    firebase.database().ref().update(updates);
}

function readUserCompanyData(userId) {
    return firebase.database().ref('/users/' + userId + '/companies').once('value').then(function (snapshot) {
        var companies = (snapshot.val());
        return companies;
    });
}
function signOutUser() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        localStorage.removeItem('LOAF_USER')
        localStorage.removeItem('trackedCompanies')
        localStorage.removeItem('LOAF_WELCOME_SHOWN')
        window.location.reload();
      }, function(error) {
        console.error('Sign Out Error', error);
      });
}

export { writeUserData, readUserCompanyData, updateCompanies, getFirebaseAuthObject, signinWithGoogle, signOutUser, updateUserCompanyData, updateUserCompanyShareData }