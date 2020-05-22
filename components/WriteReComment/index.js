import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

const WriteReComment = (props) => {
    const { reCommentRefresh, id } = props;
    const [comment, setComment] = useState();
    
    // firebase function re-factor the code
    const commentSubmit = async (post_id) => {
        const user = firebase.auth().currentUser;
        const userId = firebase.auth().currentUser.uid;
        const ref = await firebase.database().ref('comments/'+`${post_id}/`);
        const key = ref.push().key;

        const reCommentRef = await firebase.database().ref('comments/'+`${post_id}/`+key);
        const timestamp = new Date().getTime();

        reCommentRef.update({
            "author" : {
                author_img: user.photoURL,
                author_name: user.displayName,
                author_uid: userId,
            },
            "content": comment,
            "timestamp": timestamp,
            "depth": 1,
            "id": key,
        })

        reCommentRefresh();
        setComment('');
    }

    return(
        <div className="write-re-comment">
            <textarea
                className="comment-text"
                name="comment" 
                cols="30" 
                rows="2"
                placeholder={'댓글의 댓글을 입력해주세요'}
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
            >
            </textarea>
            <button
                className="comment-btn"
                onClick={() => commentSubmit(id)}
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
    reCommentRefresh: PropTypes.func,
    id: PropTypes.string,
}

export default WriteReComment;
