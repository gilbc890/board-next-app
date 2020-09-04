import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Comments from '../Comments';
import Likes from '../Likes';
import WriteComment from '../WriteComment';
import { loadHumorReply } from '../../firebase/db'
import { CircularProgress } from '@material-ui/core';

const HumorPost = (props) => {
    const data = props.post.data[0];
    const { user, query, reply } = props;

    
    const [commentRefresh, setCommentRefresh] = useState(false);
    const [replyData, setReplyData] = useState(reply);

    useEffect(() => {
        if (commentRefresh) {
            setCommentRefresh(!commentRefresh);
            replyUpdate();
        }
    }, []);

    const replyUpdate = async () => {
        const res = await loadHumorReply(query);
        return setReplyData(res);
    }

      
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
                        <div className="post-uid">{data.author.author_name}</div>
                    </div>
                </div>
                <div className="post-context">
                    <div className="context-img">
                        <img src={`${data.img}`} className="post-img" />
                    </div>
                        <div className="context-text">
                            {data.content}
                        </div>
                        <Likes
                            user={user}
                            id={data.id}
                        />
                        {data.tags?
                            <div className="tags">
                                {data.tags.map((item) => `#${item} `)}
                            </div>
                        :
                            <div/>
                        }
                        {user ?
                            <WriteComment
                                id={data.id}
                                commentRefresh={() => setCommentRefresh(!commentRefresh)}
                            />
                            :
                            <div/>
                        }
                        {replyData  ?
                            <Comments 
                                reply={replyData} 
                                user={user}
                                commentRefresh={() => setCommentRefresh(!commentRefresh)}
                                query={query}
                            />                        
                            :
                            <div/>
                        }
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
            .post-img {
                width: 100%;
            }
            .context-text {
                padding-top: 5%;
                margin: 1% 5% 5%;
            }
            .tags {
                padding: 5%;
                color: #5680e9
            }
        `}</style>
    </div>
    )
}

HumorPost.propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object,
    reply: PropTypes.array,
    query: PropTypes.string,
}

export default HumorPost;
