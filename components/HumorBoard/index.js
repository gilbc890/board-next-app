import React, { useState } from 'react';


function HumorBoard() {
    const [showResults, setShowResults] = useState(false);

    return(
        <div className="humor">
        <aside>
            <div 
                className="board-title"
                onClick={() => setShowResults(!showResults)}
            >
                <h2>Board title</h2>
                <span>icon</span>
            </div>
            { showResults ? 
                <div className="board-context">
                    <div className="context-img">
                        <img src= "https://unsplash.it/300/300" />
                    </div>
                    <div className="context-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique voluptate sed reiciendis rerum blanditiis, earum voluptatem culpa laborum quasi facilis animi rem vero nemo asperiores quibusdam placeat aliquid voluptas. Modi!
                        <br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet neque fuga obcaecati voluptate atque cumque nisi, earum provident odit ratione, officia repudiandae consectetur tenetur, distinctio quas vitae qui optio cupiditate.
                    </div>
                </div>
                :
                <div className="blank"/>
            }
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
