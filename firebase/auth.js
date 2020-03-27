import firebase from 'firebase/app';
import { auth } from './';

export const authWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
};

export const signOut = async () => {
  auth.signOut().then(window.location.reload());
};