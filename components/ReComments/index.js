import React from 'react';
import PropTypes from 'prop-types';

function ReComments(props) {
    const { reComments } = props;

    return(
        <div className="re-comments">
            <div key={reComments.timestamp} className="re-comment-wrapper">
                <div className="re-comment-user">
                    <img src={reComments.author.author_img} alt="profile"/>
                    <div className="re-comment-uid">{reComments.author.author_name}</div>
                </div>
            <div>{reComments.content}</div>
        </div>
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
    reComments: PropTypes.object,
}

export default ReComments;
