import React, { useState } from 'react';


function HumorBoard(props) {
    const [showResults, setShowResults] = useState(false);
    const [boardId, setBoardId] = useState(0);

    const idSetting = (id) => {
        setShowResults(!showResults);
        setBoardId(id);
    }
    const showCheck = (clickId) => {
        const result = showResults && clickId === boardId 
        return result
   }

    const data = props.board.data[0];
    const board = Object.keys(data).map((item) => data[item])

    return(
        <div className="humor">
        <aside>
            {board.map((item) => {
                return(
                    <>
                    <div 
                        key={item.id}
                        className="board-title"
                        onClick={() => idSetting(item.id)}
                    >
                        <h2>{item.title}</h2>
                        <span>icon</span>
                    </div>
                    {showCheck(item.id) ? 
                    <div className="board-context">
                        <div className="context-img">
                            {item.img}
                        </div>
                        <div className="context-text">
                            {item.body}
                        </div>
                    </div>
                    :
                    <div className="blank"/>
                    }

                    </>
                )
                })
            }
            {/* {showResults
                ? 
                board.map((item) => {
                    return(
                        <div 
                            className="board-context"
                            key={item.id}    
                        >
                            <div className="context-img">
                                {item.img}
                            </div>
                            <div className="context-text">
                                {item.body}
                            </div>
                        </div>
                    )
                })
            :
            <div className="blank"/>
            } */}
        </aside>
        <style jsx>{`
            .humor{
                width:60%;
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
            }
            .board-context{
                background: #424242;
                border-radius: 0 0 20px 20px;
                padding: 5%;
                color: #fff;
                transition: 0.5s ease-out;
            }
            .blank{
                transition: 0.5s ease-out;
            }
            .context-img{
                text-align: center;
                transition: 0.5s ease-out;
            }
            .context-text{
                padding-top: 5%;
            }
        `}</style>
    </div>
    )
}

export default HumorBoard;
