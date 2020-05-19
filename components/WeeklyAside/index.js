
import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';


const WeeklyAside = (props) => {
    const { weeklyData } = props;
    const weeklyBoard = Object.keys(weeklyData).map((item) => weeklyData[item]);
    const weeklyDataLength = weeklyData.length >= 5 ? 5 : weeklyData.length;

    return(
    <div className="weekly">
        <aside>
            <div className="weekly-board-wrap">
                <h2>주간 조회수</h2>
            </div>
            <div>
                {weeklyBoard.slice(0, weeklyDataLength).map((item) => {
                    const boardTitle = item.title.toLowerCase().replace(/[^\w\s]/gi, "-");
                    return(
                        <div key={item.id} className="weekly-board">
                            <Link href={`/humor/:slug/:id`} as={`/humor/${boardTitle}/${item.id}`}>
                                <div className="weekly-board-title">
                                    <h2>{item.title}</h2>
                                </div>
                            </Link>
                        </div>
                    )})
                }
            </div>
        </aside>
        <style jsx>{`
            .weekly {
                width:30%;
            }
            .weekly-board-wrap {
                background: #424242;
                border-radius: 20px 20px 0 0;
                padding: 1% 10%;
                color:#fff;
                font-size: 1.5vw;
            }
            .weekly-board {
                background: #424242;
                padding: 1% 10%;
                color: #fff;
                cursor: pointer;
            }
            .weekly-board:last-child {
                border-radius: 0 0 20px 20px;
            }
            .weekly-board-title {
                font-size: 1vw;
            }
        `}</style>
    </div>
)
}

WeeklyAside.propTypes = {
    weeklyData: PropTypes.array.isRequired,
}

export default WeeklyAside;
