import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

const WriteReComment = (props) => {
    const { bundle_id, reCommentRefresh, writeReReply, id } = props;
    const [comment, setComment] = useState();
    
    // firebase function re-factor the code
    const commentSubmit = async (post_id, bundle_id) => {
        const user = firebase.auth().currentUser;
        const userId = firebase.auth().currentUser.uid;
        const ref = firebase.database().ref('humor/comments/' + `${post_id}/`);
        const key = ref.push().key;

        const reCommentRef = firebase.database().ref('humor/comments/' + `${post_id}/` + key);
        const userRef = await firebase.database().ref('users/'+userId+'/humor/comments/'+key);
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
            "post_id": id,
            "depth": 0,
            "bundle_id": timestamp,
            "id": key,
        })


        reCommentRefresh();
        writeReReply();
        setComment('');
    }

    return(
        <div className="write-re-comment">
            <textarea
                className="comment-text"
                name="comment" 
                cols="30" 
                rows="2"
                placeholder={'대댓글을 입력해주세요'}
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
            >
            </textarea>
            <button
                className="comment-btn"
                onClick={() => commentSubmit(id, bundle_id)}
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
    writeReReply: PropTypes.func,
    bundle_id: PropTypes.number,
    id: PropTypes.string,
}

export default WriteReComment;
