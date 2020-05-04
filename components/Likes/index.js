import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import firebase from 'firebase/app';

const Likes = (props) => {
    const { user, id } = props;
    const [countLikes, setCountLikes] = useState();

    useEffect(() => {
        likedUser()
    });

    // firebase function re-factor the code
    const likedUser = async () => {

        const likesRef = firebase.database().ref('posts/'+`${id}/`+'likes');
        let data = [];
        await likesRef.once('value', (snapshot) => {
            data.push(snapshot.val())
        });

        const users = Object.keys(data[0] || 0);
        setCountLikes(users.length);
        
        return users
    }

    const checkLikedUser = async () => {
        const userId = firebase.auth().currentUser.uid;
        const likedUserResult = await likedUser();

        return likedUserResult.includes(userId)
    }

    const likes = async () => {
        // var postKey = firebase.database().ref().child('posts/').push().key;
        const userId = firebase.auth().currentUser.uid;
        const check = await checkLikedUser();

        firebase.database().ref('posts/' + `${id}/` +'likes').update({
            [userId]: check ? null : new Date().toISOString() 
        });

        if(checkLikedUser()){
            if(countLikes === 0){
                setCountLikes(0)
            } else {
                setCountLikes(countLikes-1)
            }
        } else{
            setCountLikes(countLikes+1)
        }
    }
    
    return(
        <div className="likes">
            {user?
                <button
                    className="like-btn"
                    onClick={() => likes()}
                >
                    <ThumbUpIcon />
                    {countLikes
                    ?
                        <span className="count">{countLikes}</span>
                    :
                        <span/>
                    }
                </button>
            :
                <button
                    className="like-btn disabled-btn"
                    disabled
                >
                    <ThumbUpIcon />
                    {countLikes
                    ?
                        <span className="count">{countLikes}</span>
                    :
                        <span/>
                    }
                </button>
            }

        <style jsx>{`
            .likes {
                display: flex;
                justify-content: center;
                padding: 10%;
            }
            .like-btn {
                background: transparent;
                border: none;
                color: #fff;
                cursor: pointer;
                display: flex;
                align-items: center;
            }
            .disabled-btn {
                cursor: auto;
            }
            .count {
                margin: 10%;
                font-size: 1.5vw;
                transition-timing-function: ease-in;
            }
        `}</style>
    </div>
    )
}

Likes.propTypes = {
    user: PropTypes.object,
    id: PropTypes.string,
}

export default Likes;
