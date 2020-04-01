import React from 'react';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Likes = (props) => {
    const { count } = props;
    console.log(count, 'count')
    const likes = () => {
        console.log('test')
    }

    return(
        <div className="likes">
            <button
                className="like-btn"
                onClick={() => likes()}
            >
                <ThumbUpIcon />
                {count
                ?
                    <span className="count">{count}</span>
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
            }
        `}</style>
    </div>
    )
}

Likes.propTypes = {
    count: PropTypes.number,
}
  
export default Likes;
