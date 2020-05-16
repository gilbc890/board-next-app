import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types';
import Nav from '../../components/Nav'
import WeeklyAside from '../../components/WeeklyAside'
import HumorList from '../../components/HumorList'
import Upload from '../../components/Upload'
import { loadDB } from '../../firebase/db'
import { loadMoreDB } from '../../firebase/db'
import { auth } from '../../firebase';
import { CircularProgress } from '@material-ui/core';


const Humor = (props) => {
  const query = props.query;
  const firstItem = 0;
  const [lastItem, setLastItem] = useState(3);
  const [data, setData] = useState(props.data);
  const [total, setTotal] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
    });  
  },[]);

  const loadMore = async (total) => {
    setLastItem(lastItem + 3);
    const loadMore = await loadMoreDB(lastItem+3, total);
    setTotal(loadMore.total);
    setShowButton(loadMore.showButton)
    setData(loadMore);
  }

  if ( !data ) {
    return <CircularProgress />
  }

  return(
    <div className="container">
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="This is meta description Sample. We can add up to 158." />
      <link rel="canonical" href="http://example.com/" />
      <meta name="robots" content="index, follow" /> 
      <meta property="og:type" content="article" />
      <meta property="og:title" content="TITLE OF YOUR POST OR PAGE" />
      <meta property="og:description" content="DESCRIPTION OF PAGE CONTENT" />
      <meta property="og:image" content="LINK TO THE IMAGE FILE" />
      <meta property="og:url" content="PERMALINK" />
      <meta property="og:site_name" content="SITE NAME" />
      <meta name="twitter:title" content="TITLE OF POST OR PAGE" />
      <meta name="twitter:description" content="DESCRIPTION OF PAGE CONTENT" />
      <meta name="twitter:image" content="LINK TO IMAGE" />
      <meta name="twitter:site" content="@USERNAME"/>
      <meta name="twitter:creator" content="@USERNAME" />
    </Head>
    <Nav user={user} />
    <main className="main-container">
      <WeeklyAside/>
      <div className="humor-container">
        <HumorList 
          board={data}
          query={query}
          firstItem={firstItem}
          lastItem={lastItem}
        />
        {showButton ? 
        <button
          className="loading-btn"
          onClick={() => loadMore(total)}
        >
          Load More
        </button>
        :
        <div/>
        }

      </div>
      {user ?
        <Upload />
        :
        <div />
      }
    </main>
    <footer>
    </footer>
    <style jsx>{`
      .main-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5%;
        margin-top: 5%;
      }
      .humor-container{
        width: 60%;
        text-align: center;
      }
      .loading-btn{
        padding: 1.5%;
        margin: 5%;
        border-radius: 20px;
        background: #5680e9;
        color: #fff;
        border-color: #5680e9;
      }
    `}</style>

    <style jsx global>{`
      body{
        background: #121212;
        padding: 0;
        margin: 0;
      }
    `}</style>
    </div>

  )
}

Humor.getInitialProps = async ({query}) => {
  const data = await loadDB(3);

  return {
    data,
    query,
  }
}

Humor.propTypes = {
  data: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
}


export default Humor
