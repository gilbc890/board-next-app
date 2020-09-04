import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { likedUserDB, likesDB } from '../../firebase/db';
import { getUid } from '../../firebase/auth';


const Likes = (props) => {
    const { user, id } = props;
    const [countLikes, setCountLikes] = useState(0);

    useEffect(() => {
        likedUser(id)
    });

    const likedUser = async (id) => {
        const users = Object.keys(await likedUserDB(id) || 0);

        setCountLikes(users.length);        
        return users
    }

    const checkLikedUser = async (id) => {
        const userId = getUid();
        const likedUserResult = await likedUser(id);

        return likedUserResult.includes(userId)
    }

    const likes = async (id) => {
        const userId = getUid();
        const check = await checkLikedUser(id);

        likesDB(userId, id, check);

        if(checkLikedUser(id)){
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
                    onClick={() => likes(id)}
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
