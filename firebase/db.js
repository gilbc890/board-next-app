import { db } from './';

export const loadDB = async (id) => {
  const postRef = db.ref('posts/');
  let data = [];
  await postRef.orderByChild('id').limitToLast(id).once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.id);
  const dataLength = data.length;
  return { data, dataLength }
};

export const loadPost = async (id) => {
  const postRef = db.ref('posts/');
  let data = [];
  await postRef.orderByChild('id').equalTo(id).once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.id);
  const dataLength = data.length;
  return { data, dataLength }
};

export const loadReply = async (id) => {
  const postRef = db.ref('posts/');
  let data = [];
  await postRef.orderByChild('id').equalTo(id).once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.id);
  const reply = data[0].reply
  return reply
};

export const dbLength = async () => {
  const postRef = db.ref('posts/');
  const total = await postRef.orderByChild('id').once('value').then((snapshot) => snapshot.val())
  const totalLength = Object.keys(total).length;
  return totalLength;
}

export const loadMoreDB = async (endNum, total) => {
  const postRef = db.ref('posts/');
  let data = [];
  await postRef.orderByChild('id').limitToLast(endNum).once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.id).reverse();
  const dataLength = data.length;

  if(total === 0 ){
    const total = await dbLength();
    if (endNum > total ){
      const showButton = false;
      return { data, dataLength, total, showButton }
    } else {
      const showButton = true;
      return { data, dataLength, total, showButton }  
    }
  } else {
    if (endNum > total ){
      const showButton = false;
      return { data, dataLength, total, showButton }
    } else {
      const showButton = true;
      return { data, dataLength, total, showButton }  
    }
  }
};
