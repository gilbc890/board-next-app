import firebase from 'firebase/app';

export const authWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
};

export const signOut = async () => {
  firebase.auth().signOut().then(window.location.reload());
};