import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types';
import Nav from '../../../components/Nav'
import WeeklyAside from '../../../components/WeeklyAside'
import HumorBoard from '../../../components/HumorBoard'
import Upload from '../../../components/Upload'
import { loadPost } from '../../../firebase/db'
import { CircularProgress } from '@material-ui/core';
import { auth } from '../../../firebase';

const Humor = (props) => {
  const id = parseInt(props.query.id);
  const data = props.data;
  const query = props.query;
  const [user, setUser] = useState();
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
    });  
  },[]);

  if ( !data ) {
    return <CircularProgress />
  }
  const board = Object.keys(data).map((item) => data[item])

  const selectedItem = board[0].find( item => item.id === id)

  const firstItem = 0;
  const lastItem = 1;


  return(
    <div className="container">
    <Head>
      <title>{selectedItem.title}</title>
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
      <div className="post-container">
        <HumorBoard         
          board={data}
          query={query}
          firstItem={firstItem}
          lastItem={lastItem}
        />
      </div>
      {user ?
        <Upload/>
        :
        <div />
      }
    </main>
    <footer>
    </footer>
    <style jsx>{`
      .main-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5%;
      }
      .post-container{
        width:60%;
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
  const data = await loadPost(parseInt(query.id));

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
