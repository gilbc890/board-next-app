import Link from 'next/link'
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

function HumorBoard(props) {
    const showCheck = (item) => {
        const currentId = parseInt(props.board.query.id);
        return currentId === item;
    }
    const data = props.board.data;

    if (!data ){
        return <CircularProgress />;
    }

    const board = Object.keys(data).map((item) => data[item])


    return(
        <div className="humor">
        <aside>
            {board.map((item) => {
                const boardTitle = item.title.toLowerCase().replace(/\s+/g, "-");
                return(
                    <div key={item.id}>
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
}

export default HumorBoard;
