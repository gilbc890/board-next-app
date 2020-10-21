import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReComments from '../ReComments';
import WriteReComment from '../WriteReComment';
import ReplyIcon from '@material-ui/icons/Reply';
import { loadHumorReply } from '../../firebase/db'

const Comments = (props) => {
    const { reply, user, commentRefresh, query } = props;
    const defaultComment = Object.keys(reply).map((item) => reply[item]).sort((a,b) => {
        if(b.bundle_id === a.bundle_id) {
            if (b.depth === a.depth){
                return b.timestamp - a.timestamp
            }
            return a.timestamp - b.timestamp
        }
        return b.bundle_id - a.bundle_id
    });
    const [writeReReply, setWriteReReply] = useState(false);
    const [timestampId, setTimestampId] = useState();
    const [comment, setComment] = useState(defaultComment);
    const [reCommentRefresh, setReCommentRefresh] = useState(false);
    const [tempRes, setTempRes] = useState();
    const prev = useRef();
    
    useEffect(() => {
        prev.current = reply;
        const prevProps = Object.keys(reply).map((item) => reply[item]);
        
        if (prevProps.length !== comment.length){
            setComment(defaultComment);
        }
        if (reCommentRefresh) {
            commentRefresh();
            setReCommentRefresh(!reCommentRefresh);
            replyUpdate();
        }
    }, [commentRefresh, reCommentRefresh]);

    if( tempRes ) {
        const tempResCon = Object.keys(tempRes).map((item) => reply[item]).sort((a,b) => {
            if(b.bundle_id === a.bundle_id) {
                if (b.depth === a.depth){
                    return b.timestamp - a.timestamp
                }
                return a.timestamp - b.timestamp
            }
            return b.bundle_id - a.bundle_id
        });

        setComment(tempResCon);
        setTempRes('');      
    }

    const replyUpdate = async () => {
        const res = await loadHumorReply(query);
        return setTempRes(res);
    }

    const showWriteReComment = (id) => {
        setWriteReReply(!writeReReply);
        setTimestampId(id);
    }
    
    return(
        <div className="comments">
            {comment.slice(0, reply.length).map((item) => {
                return  (
                    <div key={item.timestamp} className="comment">
                        {item.depth === 0 ?
                            <div className="comment-wrapper">
                                <div className="comment-user">
                                    <img src={item.author.author_img} alt="profile"/>
                                    <div className="comment-uid">{item.author.author_name}</div>
                                </div>
                                <div className="content">{item.content}</div>
                            {user? 
                                <button 
                                    className="re-reply"
                                    onClick={() => showWriteReComment(item.timestamp)}
                                >
                                    <ReplyIcon/>
                                </button>
                                :
                                <div/>
                            }
                        </div>
                        :
                        <div/>
                        }
                        {item.depth === 1?
                            <ReComments 
                                reComments={item} 
                                re_number={Object.keys(item).length}
                                reCommentRefresh={() => setReCommentRefresh(!reCommentRefresh)}
                            />
                        :
                            <div/>
                        }
                        {timestampId === item.timestamp && writeReReply?
                            <div>
                                <WriteReComment
                                    id={query}
                                    bundle_id={item.bundle_id}
                                    reCommentRefresh={() => setReCommentRefresh(!reCommentRefresh)}
                                    writeReReply={() => setWriteReReply(!writeReReply)}
                                />
                            </div>
                            :
                            <div/>
                        }
                    </div>
                    )
                })
            }
        <style jsx>{`
            .comment-wrapper {
                width: 100%;
                display: flex;
                align-items: center;
                padding: 1% 0;
                box-sizing: border-box;
            }
            .comment-user {
                width: 20%;
                text-align: center;
                margin-right: 10%;
            }
            .comment-user>img {
                width: 40%;
                border-radius: 50%;
            }
            .comment-uid {
                font-size: 1vw;
            }
            .content { 
                width: 70%;
            }
            .re-reply {
                background: transparent;
                border: none;
                width: 10%;
                cursor: pointer;
            }
        `}</style>
    </div>
    )
}

Comments.propTypes = {
    reply: PropTypes.array.isRequired,
    user: PropTypes.object,
    commentRefresh: PropTypes.func,
    query: PropTypes.string,
}

export default Comments;
