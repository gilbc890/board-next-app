import { db, auth } from './';

export const authWithFacebook = async () => {
  const provider = new auth.FacebookAuthProvider();
  const result = await auth.signInWithPopup(provider);
  await signInWithProvider(result);
};

const signInWithProvider = async (result) => {
  const { user } = result;
  const userExists = await getUserById(user.uid);
  
  if(!userExists) {
    const ref = await db.ref('users/'+user.uid);

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
  const user = await db.ref(`users/${userId}`).once('value').then((snapshot) => snapshot.val());
  return user;
};

export const getUid = () => {
  const userId = auth.currentUser.uid;
  return userId;
}


export const signOut = async () => {
  auth.signOut().then(window.location.reload());
};