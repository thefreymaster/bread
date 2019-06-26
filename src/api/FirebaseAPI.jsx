import firebase from 'firebase';
import { showNotification } from '../components/HelperFunctions/Notifications';


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(config);
// const perf = firebase.performance();

const initializeFirebase = () => {
    firebase.initializeApp(config);
}


export const determineIfUserIsLoggedIn = (dispatch) => {
    if (!firebase) {
        initializeFirebase();
    }
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            dispatch({ type: "MARK_AS_LOGGED_IN" })
        }
    });
}

function signinWithGoogle(history, dispatch) {
    dispatch({ type: "IS_FETCHING" });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        let { user, additionalUserInfo } = result;
        let { isNewUser } = additionalUserInfo;
        let { uid, email, displayName, photoURL } = user;

        localStorage.setItem('LOAF_USER', JSON.stringify(user));
        if (isNewUser) {
            const { profile, providerId } = additionalUserInfo;
            const { email, family_name, given_name, id, locale, name, picture } = profile;
            firebase.database().ref('accounts/' + uid + '/meta').set({
                email, family_name, given_name, id, locale, name, picture, providerId
            }).then(() => {
                history.push('/choices');
                dispatch({ type: "FETCHING_COMPLETE" });
            }).catch(function (error) {
                dispatch({ type: "FETCHING_COMPLETE" });
                dispatch({ type: 'APP_HAS_ERROR', payload: { errorMessage: error.message, errorCode: error.code } });
            });
        }
        else {
            dispatch({ type: "FETCHING_COMPLETE" });
            history.push('/portfolio');
        }
    }).catch(function (error) {
        dispatch({ type: 'APP_HAS_ERROR', payload: { errorMessage: error.message, errorCode: error.code } });
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
function updateUserCompanyData(userId, trackedCompanies, dispatch) {
    dispatch({ type: "IS_FETCHING" })
    firebase.database().ref('accounts/' + userId.toLowerCase() + '/companies').update({
        trackedCompanies
    }, () => {
        dispatch({ type: "FETCHING_COMPLETE" })
    })
    
}
function updateUserCompanyShareData(userId, trackedCompanies, companyIndex) {
    var newPostKey = firebase.database().ref().child('users').push().key;
    let updates = {};
    updates['/users/' + userId + '/companies/'] = trackedCompanies;
    firebase.database().ref().update(updates);
}

function readUserCompanyData(userId) {
    return firebase.database().ref('/accounts/' + userId + '/companies').once('value').then(function (snapshot) {
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

export { writeUserData, readUserCompanyData, updateCompanies, signinWithGoogle, signOutUser, updateUserCompanyData, updateUserCompanyShareData }