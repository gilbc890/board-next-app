
import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';


const ClicksAside = (props) => {
    const { clicksData } = props;
    const clicksBoard = Object.keys(clicksData).map((item) => clicksData[item]);
    const clcicksDataLength = clicksData.length >= 5 ? 5 : clicksData.length;

    return(
    <div className="click">
        <aside>
            <div className="click-board-wrap">
                <h2>베스트 조회수</h2>
            </div>
            <div>
                {clicksBoard.slice(0, clcicksDataLength).map((item) => {
                    const boardTitle = item.title.toLowerCase().replace(/[^가-힣a-zA-Z0-9]/gi, "-");
                    return(
                        <div key={item.id} className="click-board">
                            <Link href={`/humor/:id/:slug`} as={`/humor/${item.id}/${boardTitle}`}>
                                <div className="click-board-title">
                                    <h2>{item.title}</h2>
                                </div>
                            </Link>
                        </div>
                    )})
                }
            </div>
        </aside>
        <style jsx>{`
            .click {
                width:30%;
            }
            .click-board-wrap {
                background: #424242;
                border-radius: 20px 20px 0 0;
                padding: 1% 10%;
                color:#fff;
                font-size: 1.5vw;
            }
            .click-board {
                background: #424242;
                padding: 1% 10%;
                color: #fff;
                cursor: pointer;
            }
            .click-board:last-child {
                border-radius: 0 0 20px 20px;
            }
            .click-board-title {
                font-size: 1vw;
            }
        `}</style>
    </div>
)
}

ClicksAside.propTypes = {
    clicksData: PropTypes.array.isRequired,
}

export default ClicksAside;
