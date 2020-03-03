import { db } from './firebase';

export const loadDB = async () => {
  const data = [];
  const postRef = db.ref('board-upload/');
  postRef.orderByChild('id').on("child_added", function (snapshot){
      data.push(snapshot.val());  
  });
  data.reverse();
  const dataLength = data.length;

  return { data, dataLength }
};