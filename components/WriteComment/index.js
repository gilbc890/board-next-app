import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

const WriteComment = (props) => {
    const { commentRefresh, id } = props;
    const [comment, setComment] = useState();
    
    // firebase function re-factor the code
    const commentSubmit = async (id) => {
        const user = firebase.auth().currentUser;
        const userId = firebase.auth().currentUser.uid;
        const ref = await firebase.database().ref('humor/comments/'+`${id}`);
        const key = ref.push().key;

        const commentRef = await firebase.database().ref('humor/comments/'+`${id}/`+key);
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
            "bundle": timestamp,
            "id": key,
        })
        commentRefresh();
        setComment('');
    }

    return(
        <div className="write-comment">
            <textarea
                className="comment-text"
                name="comment" 
                cols="30" 
                rows="2"
                placeholder={'댓글을 입력해주세요'}
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
            >
            </textarea>
            {comment ?
                <button
                    className="comment-btn"
                    onClick={() => commentSubmit(id)}
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
            border-color: transparent;
        }
        .comment-btn {
            width: 10%;
            margin: 1% 0.5%;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.5vw;
            broder-color: transparent;
        }
        `}</style>
    </div>
    )
}

WriteComment.propTypes = {
    commentRefresh: PropTypes.func,
    id: PropTypes.string,
}

export default WriteComment;
