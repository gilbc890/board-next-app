import React from 'react';
import PropTypes from 'prop-types';

function ReComments(props) {
    const { re_reply, re_number } = props;
    const reComments = Object.keys(re_reply).map((item) => re_reply[item]);

    return(
        <div className="re-comments">
            {reComments.slice(0, re_number).map((item) => {
                return  (
                    <div key={item.id} className="re-comment-wrapper">
                        <div className="re-comment-user">
                            <img src={item.author.author_img} alt="profile"/>
                            <div className="re-comment-uid">{item.author.author_uid}</div>
                        </div>
                        <div>{item.content}</div>
                    </div>
                    )
                })
            }
        <style jsx>{`
            .re-comments {
                width: 80%;
                margin-left: 10%;
            }
            .re-comment-wrapper {
                width: 100%;
                display: flex;
                align-items: center;
                padding: 1% 0;
                box-sizing: border-box;
            }
            .re-comment-user {
                width: 20%;
                text-align: center;
                margin-right: 10%;
            }
            .re-comment-user>img {
                width: 40%;
                border-radius: 50%;
            }
            .re-comment-uid {
                font-size: .8vw;
            }
        `}</style>
    </div>
    )
}

ReComments.propTypes = {
    re_reply: PropTypes.object,
    re_number: PropTypes.number,
}

export default ReComments;
