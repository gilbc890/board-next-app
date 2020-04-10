import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

const WriteReComment = (props) => {
    const [comment, setComment] = useState();
    const { reply_key } = props;
    
    // firebase function re-factor the code
    const commentSubmit = async (reply_key) => {
        const user = firebase.auth().currentUser;
        const userId = firebase.auth().currentUser.uid;
        const ref = await firebase.database().ref('posts/'+'board10/'+'reply/'+reply_key);
        const key = ref.push().key;

        const reCommentRef = await firebase.database().ref('posts/'+'board10/'+'reply/'+`${reply_key}/`+'re_reply/'+key);

        await reCommentRef.update({
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
        <div className="write-re-comment">
            <textarea
                className="comment-text"
                name="comment" 
                cols="30" 
                rows="2"
                placeholder={'댓글의 댓글을 입력해주세요'}
                onChange={(e) => setComment(e.currentTarget.value)}
            >
            </textarea>
            <button
                className="comment-btn"
                onClick={() => commentSubmit(reply_key)}
            >
                확인
            </button>
        <style jsx>{`
        .write-re-comment {
            display: flex;
            justify-content: center;
            padding: 2.5% 0;
            width: 80%;
            margin-left: 10%;
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
        }
        `}</style>
    </div>
    )
}

WriteReComment.propTypes = {
    reply_key: PropTypes.string.isRequired,
}

export default WriteReComment;
