import React, { useState } from 'react';
import firebase from 'firebase/app';

const WriteComment = () => {
    const [comment, setComment] = useState();

    // firebase function re-factor the code
    const commentSubmit = async () => {
        const user = firebase.auth().currentUser;
        const userId = firebase.auth().currentUser.uid;
        const ref = await firebase.database().ref('posts/'+'board10/'+'reply');
        const key = ref.push().key;

        const commentRef = await firebase.database().ref('posts/'+'board10/'+'reply/'+key);

        commentRef.update({
            "author" : {
                author_img: user.photoURL,
                author_name: user.displayName,
                author_uid: userId,
            },
            "content": comment,
            "timestamp": new Date().getTime(),
            "id": key,
        })
    }

    return(
        <div className="write-comment">
            <textarea
                className="comment-text"
                name="comment" 
                cols="30" 
                rows="2"
                placeholder={'댓글을 입력해주세요'}
                onChange={(e) => setComment(e.currentTarget.value)}
            >
            </textarea>
            {comment ?
                <button
                    className="comment-btn"
                    onClick={() => commentSubmit()}
                >
                    확인
                </button>
                :
                <button
                    className="comment-btn"
                    disabled
                >
                    확인
                </button>
            }
        <style jsx>{`
        .write-comment {
            display: flex;
            justify-content: center;
            padding: 2.5% 0;
        }
        .comment-text {
            width: 80%;
            margin: 1% 0.5%;
            border-radius: 8px;
            padding: 2.5%;
        }
        .comment-btn {
            width:10%;
            margin: 1% 0.5%;
            border-radius: 8px;
            cursor: pointer;
            font-size:1.5vw;
        }
        `}</style>
    </div>
    )
}

export default WriteComment;
