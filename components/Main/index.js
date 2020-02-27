import Head from 'next/head'
import WeeklyAside from '../WeeklyAside'
import HumorBoard from '../HumorBoard'
import Upload from '../Upload'

const Main = (props) => {
    return(
    <div className="main">
        <Head>
        </Head>
        <main className="main-container">
            <WeeklyAside/>
            <HumorBoard board={props} />
            <Upload/>
        </main>
        <style jsx>{`
            .main-container{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5%;
            }
        `}</style>
    </div>
    )
}

export default Main;