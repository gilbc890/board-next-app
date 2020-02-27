import { db } from './firebase';

export const loadDB = () => {
  const titleRef = db.ref('board-upload/');
  const data = [];
  titleRef.on('value', (snapshot) => {
    if (snapshot.exists()) {
      data.push(snapshot.val())
    } 
  });
  return data;
};