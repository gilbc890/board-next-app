import firebase from 'firebase/app';

export const authWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
};