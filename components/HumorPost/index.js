import React from 'react';
import PropTypes from 'prop-types';
import Comments from '../Comments';
import Likes from '../Likes';
import { CircularProgress } from '@material-ui/core';

const HumorPost = (props) => {
    const data = props.post.data[0];
    
    if (!data ){
        return <CircularProgress />;
    }
    
    return(
        <div className="humor">
        <aside className="post-container">
            <div>
                <div className="post-title">
                    <h2>{data.title}</h2>
                    <div className="post-user">
                        <img src={data.author.author_img} alt="profile"/>
                        <div className="post-uid">{data.author.author_uid}</div>
                    </div>
                </div>
                <div className="post-context">
                    <div className="context-img">
                        <img src={`${data.img}`} alt="post-img"/>
                    </div>
                        <div className="context-text">
                            {data.content}
                        </div>
                        <Likes />
                        <Comments 
                            reply={data.reply} 
                            number={Object.keys(data.reply).length}
                        />
                    </div>
            </div>
        </aside>
        <style jsx>{`
            .humor {
                width: 100%;
            }
            .post-title {
                background: #424242;
                border-radius: 20px 20px 0 0;
                padding: 1% 5%;
                color: #fff;
                margin-bottom: 0.5%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .post-title > h2 {
                width: 80%;
                text-align: left;
            }
            .post-user {
                width: 10%;
                text-align: center;
            }
            .post-uid {
                font-size: 1vw;
            }
            .post-user>img {
                width: 60%;
                border-radius: 50%;
            }
            .post-context {
                background: #424242;
                border-radius: 0 0 20px 20px;
                padding: 5%;
                color: #fff;
            }
            .context-img {
                text-align: center;
            }
            .context-text {
                padding-top: 5%;
                margin: 1% 5% 5%;
            }
        `}</style>
    </div>
    )
}

HumorPost.propTypes = {
    post: PropTypes.object.isRequired,
}

export default HumorPost;
