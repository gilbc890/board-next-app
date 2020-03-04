import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

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
            {board.slice(firstItem, lastItem).map((item) => {
               const boardTitle = item.title.toLowerCase().replace(/\s+/g, "-");
                return(
                    <div className="post" key={item.id}>
                        <Link href={`/humor/:slug/:id`} as={`/humor/${boardTitle}/${item.id}`}>
                            <div className="board-title">
                                <h2>{item.title}</h2>
                                <span>icon</span>
                            </div>                    
                        </Link>
                        {showCheck(item.id) ? 
                        <div className="board-context">
                            <div className="context-img">
                                <img src={`${item.img}`} alt=""/>
                            </div>
                            <div className="context-text">
                                {item.body}
                            </div>
                        </div>
                        :
                        <div className="blank"/>
                        }
                    </div>
                )
                })
            }
        </aside>
        <style jsx>{`
            .humor{
                width:100%;
                transition: opacity 20s ease-in;
            }
            .post{
                transition: opacity 20s ease-in;
            }
            .board-title{
                background: #424242;
                border-radius: 20px 20px 0 0;
                padding: 1% 5%;
                color: #fff;
                margin-bottom: 0.5%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                transition: opacity 20s ease-in;

            }
            .board-context{
                background: #424242;
                border-radius: 0 0 20px 20px;
                padding: 5%;
                color: #fff;
                margin-bottom: 1%;
            }
            .context-img{
                text-align: center;
            }
            .context-text{
                padding-top: 5%;
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
