import { db, auth } from './';

export const loadHumorDB = async (id) => {
  const postRef = db.ref('humor/posts/');
  let data = [];
  await postRef.orderByChild('id').limitToLast(id).once('value').then((snapshot) => {
    snapshot.forEach(function(child) {
      data.push(child.val())
    })
  })
  data = data.sort((a,b) => b.timestamp - a.timestamp);

  const dataLength = data.length;
  return { data, dataLength }
};

export const loadClicksHumorDB = async () => {
  const clciksRef = db.ref('humor/weekly/');
  let data = [];
  await clciksRef.orderByChild('views').once('value').then((snapshot) => {
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
export const loadProductItem = async (id) => {
  const postRef = db.ref('products/item/');
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

export const loadProductReply = async (id) => {
  const postRef = db.ref('products/comments/'+`${id}`);
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

export const countPost = async (id, postViewCount, postNewViewCount) => {
  if (id) {
    const postRef = await db.ref('humor/posts/'+`${id}/`);
    const clickRef = await db.ref('humor/weekly/'+`${id}/`);
    postRef.update({
      "views" : postViewCount+postNewViewCount,
    })
    clickRef.update({
      "views" : postViewCount+postNewViewCount,
    })  
  }
  else{
    return
  }
}

export const likedUserDB =  async (id) => {
  const likesRef = db.ref('humor/likes/'+`${id}/`);
  let data = [];
  await likesRef.once('value', (snapshot) => {
      data.push(snapshot.val())
  });

  return data[0]
}

export const likesDB =  async (userId, id, check) => {
  db.ref('humor/likes/' + `${id}/`).update({
    [userId]: check ? null : new Date().toISOString() 
});
}

export const commentSave = async (id, comment) => {
  const user = auth.currentUser;
  const userId = auth.currentUser.uid;
  const ref = await db.ref('humor/comments/'+`${id}`);
  const key = ref.push().key;

  const commentRef = await db.ref(`humor/comments/${id}/${key}`);
  const userRef = await db.ref(`users/${userId}/humor/comments/${key}`);
  const timestamp = new Date().getTime();
  
  commentRef.update({
      "author" : {
          author_img: user.photoURL,
          author_name: user.displayName,
          author_uid: userId,
      },
      "content": comment,
      "timestamp": timestamp,
      "post_id": id,
      "depth": 0,
      "bundle_id": timestamp,
      "id": key,
  })
  userRef.update({
      "author" : {
          author_img: user.photoURL,
          author_name: user.displayName,
          author_uid: userId,
      },
      "content": comment,
      "timestamp": timestamp,
      "post_id": id,
      "depth": 0,
      "bundle_id": timestamp,
      "id": key,
  })
}

export const reCommentSave = async (post_id, bundle_id, comment) => {
  const user = auth.currentUser;
  const userId = auth.currentUser.uid;
  const ref = db.ref(`humor/comments/${post_id}/`);
  const key = ref.push().key;

  const reCommentRef = db.ref(`humor/comments/${post_id}/${key}`);
  const userRef = await db.ref(`users/${userId}/humor/comments/${key}`);
  const timestamp = new Date().getTime();

  reCommentRef.update({
      "author" : {
          author_img: user.photoURL,
          author_name: user.displayName,
          author_uid: userId,
      },
      "content": comment,
      "timestamp": timestamp,
      "post_id": post_id,
      "bundle_id": bundle_id,
      "depth": 1,
      "id": key,
  })
  userRef.update({
      "author" : {
          author_img: user.photoURL,
          author_name: user.displayName,
          author_uid: userId,
      },
      "content": comment,
      "timestamp": timestamp,
      "post_id": post_id,
      "depth": 1,
      "bundle_id": bundle_id,
      "id": key,
  })
}

