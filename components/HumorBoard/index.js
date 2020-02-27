import Link from 'next/link'

function HumorBoard(props) {
    const showCheck = (item) => {
        const currentId = parseInt(props.board.data.query.id);
        return currentId === item;
    }

    const data = props.board.data.data[0];
    const board = Object.keys(data).map((item) => data[item])

    return(
        <div className="humor">
        <aside>
            {board.map((item) => {
                const boardTitle = item.title.toLowerCase().replace(/\s+/g, "-");
                return(
                    <>
                    <Link href={`/humor/:slug/:id`} as={`/humor/${boardTitle}/${item.id}`}>
                        <div 
                            key={item.id}
                            className="board-title"
                        >
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

                    </>
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

export default HumorBoard;
