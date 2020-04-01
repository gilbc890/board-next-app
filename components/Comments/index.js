import React from 'react';
import PropTypes from 'prop-types';
import ReComments from '../ReComments';

const Comments = (props) => {
    const { reply, number } = props;
    const comment = Object.keys(reply).map((item) => reply[item]);

    return(
        <div className="comments">
            {comment.slice(0, number).map((item) => {
                return  (
                    <div key={item.id} className="comment">
                        <div className="comment-wrapper">
                            <div className="comment-user">
                                <img src={item.author.author_img} alt="profile"/>
                                <div className="comment-uid">{item.author.author_uid}</div>
                            </div>
                            <div>{item.content}</div>
                        </div>
                        {item.re_reply ?
                            <ReComments 
                                re_reply={item.re_reply} 
                                re_number={Object.keys(item.re_reply).length}
                            />
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
        `}</style>
    </div>
    )
}

Comments.propTypes = {
    reply: PropTypes.object,
    number: PropTypes.number,
}

export default Comments;
