import { db } from './';

export const loadHumorDB = async (id) => {
  const postRef = db.ref('humor/posts/');
  let data = [];
  await postRef.orderByChild('id').limitToLast(id).once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.timestamp);
  const dataLength = data.length;
  return { data, dataLength }
};

export const loadWeeklyHumorDB = async () => {
  const weeklyRef = db.ref('humor/weekly/');
  let data = [];
  await weeklyRef.orderByChild('views').once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.timestamp);
  const dataLength = data.length;
  return { data, dataLength }
};

export const loadHumorPost = async (id) => {
  const postRef = db.ref('humor/posts/');
  let data = [];
  let viewCount = [];
  await postRef.orderByChild('id').equalTo(id).once('value').then((snapshot) => {
    viewCount.push(snapshot.numChildren());
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.timestamp);
  const dataLength = data.length;
  return { data, dataLength, viewCount }
};

export const loadHumorReply = async (id) => {
  const postRef = db.ref('humor/comments/'+`${id}`);
  let data = [];
  await postRef.orderByChild('bundle_id').once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.timestamp);
  const reply = data;
  return reply
};

export const humorDbLength = async () => {
  const postRef = db.ref('humor/posts/');
  const total = await postRef.orderByChild('id').once('value').then((snapshot) => snapshot.val())
  const totalLength = Object.keys(total).length;
  return totalLength;
}

export const loadMoreHumorDB = async (endNum, total) => {
  const postRef = db.ref('humor/posts/');
  let data = [];
  await postRef.orderByChild('id').limitToLast(endNum).once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.id).reverse();
  const dataLength = data.length;

  if(total === 0 ){
    const total = await humorDbLength();
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

export const loadProductDB = async (id) => {
  const postRef = db.ref('products/item/');
  let data = [];
  await postRef.orderByChild('id').limitToLast(id).once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((item) => item.timestamp);
  return { data }
};
