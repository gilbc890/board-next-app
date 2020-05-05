import firebase from 'firebase/app';

export const authWithFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  const result = await firebase.auth().signInWithPopup(provider);
  await signInWithProvider(result);
};

const signInWithProvider = async (result) => {
  const { user } = result;
  const userExists = await getUserById(user.uid);
  
  if(!userExists) {
    const ref = await firebase.database().ref('users/'+user.uid);

    ref.update({
        "timestamp": new Date().getTime(),
        "id": user.uid,
        "providerData":user.providerData,
    })  
  } else{
    return;
  }
};

export const getUserById = async (userId) => {
  const user = await firebase.database().ref(`users/${userId}`).once('value').then((snapshot) => snapshot.val());
  return user;
};


export const signOut = async () => {
  firebase.auth().signOut().then(window.location.reload());
};