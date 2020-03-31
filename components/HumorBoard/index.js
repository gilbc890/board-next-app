import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import Comments from '../Comments';
import { CircularProgress } from '@material-ui/core';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function HumorBoard(props) {
    const showCheck = (item) => {
        const currentId = parseInt(props.query.id);
        return currentId === item;
    }
    const data = props.board.data;

    if (!data ){
        return <CircularProgress />;
    }
    const board = Object.keys(data).map((item) => data[item])
    const firstItem = props.firstItem;
    const lastItem = props.lastItem;

    return(
        <div className="humor">
        <aside>
            <TransitionGroup component="ul" className="post-container">
                {board.slice(firstItem, lastItem).map((item) => {
                const boardTitle = item.title.toLowerCase().replace(/\s+/g, "-");
                    return(
                        <CSSTransition
                            timeout={500}
                            classNames="fade"
                            key={item.id}
                        >
                        <div key={item.id}>
                            <Link href={`/humor/:slug/:id`} as={`/humor/${boardTitle}/${item.id}`}>
                                <div className="board-title">
                                    <h2>{item.title}</h2>
                                    <div className="board-user">
                                        <img src={item.author.author_img} alt="profile"/>
                                        <div className="board-uid">{item.author.author_uid}</div>
                                    </div>
                                </div>
                            </Link>
                            {showCheck(item.id) ? 
                            <div className="board-context">
                                <div className="context-img">
                                    <img src={`${item.img}`} alt="post-img"/>
                                </div>
                                <div className="context-text">
                                    {item.content}
                                </div>
                                <Comments 
                                    reply={item.reply} 
                                    number={Object.keys(item.reply).length}
                                />
                            </div>
                            :
                            <div className="blank"/>
                            }
                        </div>
                    </CSSTransition>
                    )
                    })
                }
            </TransitionGroup>
        </aside>
        <style jsx>{`
            .humor {
                width: 100%;
            }
            .board-title {
                background: #424242;
                border-radius: 20px 20px 0 0;
                padding: 1% 5%;
                color: #fff;
                margin-bottom: 0.5%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
            }
            .board-title > h2 {
                width: 80%;
                text-align: left;
            }
            .board-user {
                width: 10%;
                text-align: center;
            }
            .board-uid {
                font-size: 1vw;
            }
            .board-user>img {
                width: 60%;
                border-radius: 50%;
            }
            .fade-enter {
                opacity: 0;
            }  
            .fade-enter-active {
                opacity: 1;
                transition: all 0.5s;
            }
            .fade-exit {
                opacity: 1;
            } 
            .fade-exit-active {
                transition: all 0.5s;
            }
            .board-context {
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

HumorBoard.propTypes = {
    board: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    firstItem: PropTypes.number.isRequired,
    lastItem: PropTypes.number.isRequired,
}

export default HumorBoard;
