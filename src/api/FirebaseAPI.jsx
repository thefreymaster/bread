import firebase from 'firebase';

function getFirebaseAuthObject() {
   // Configure Firebase.
    const config = {
        apiKey: "AIzaSyDdcRc0Rs3EfCALSUx6Kj-Exl1ZHpR3Jk4",
        authDomain: "loaf-232323.firebaseapp.com",
        databaseURL: "https://loaf-232323.firebaseio.com",
        projectId: "loaf-232323",
        storageBucket: "loaf-232323.appspot.com",
        messagingSenderId: "684620227358"
    };
    firebase.initializeApp(config);
    return firebase;
}
function signinWithGoogle(fireabse) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        debugger;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
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

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  export { writeUserData, getFirebaseAuthObject, signinWithGoogle }