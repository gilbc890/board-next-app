import { db } from './firebase';

export const loadDB = async () => {
  const titleRef = await db.ref('board-upload/');
  const data = await titleRef.once('value').then((snapshot) => snapshot.val());
  return data
};