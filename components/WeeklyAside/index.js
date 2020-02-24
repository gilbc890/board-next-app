
const WeeklyAside = () => (
    <div className="weekly">
        <aside>
            <div className="weekly-board">
                <h2>Board title</h2>
            </div>
        </aside>
        <style jsx>{`
            .weekly{
                width:30%;
            }
            .weekly-board{
                background: #424242;
                border-radius: 20px;
                padding: 1% 5%;
                color:#fff;
            }
        `}</style>
    </div>
)

export default WeeklyAside;
