import React, { useState, useEffect } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import firebase from 'firebase/app';

const Likes = () => {
    const [countLikes, setCountLikes] = useState();

    useEffect(() => {
        likedUser()
    });

    // firebase function re-factor the code
    const likedUser = async () => {
        const likesRef = firebase.database().ref('posts/'+'board10/'+'likes');
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

        firebase.database().ref('posts/' + 'board10/' +'likes').update({
            [userId]: check ? null : new Date().toISOString() 
        });

        if(checkLikedUser()){
            setCountLikes(countLikes-1)
        } else{
            setCountLikes(countLikes+1)
        }
    }
    
    return(
        <div className="likes">
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
            .count {
                margin: 10%;
                font-size: 1.5vw;
                transition-timing-function: ease-in;
            }
        `}</style>
    </div>
    )
}
  
export default Likes;
