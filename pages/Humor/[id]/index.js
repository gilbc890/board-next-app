import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types';
import Nav from '../../../components/Nav'
import WeeklyAside from '../../../components/WeeklyAside'
import HumorPost from '../../../components/HumorPost'
import { loadPost, loadReply } from '../../../firebase/db'
import { CircularProgress } from '@material-ui/core';
import { auth } from '../../../firebase';
import firebase from 'firebase/app';

const Humor = (props) => {
  const { data, query, replyData } = props;
  const id = query.id
  const [user, setUser] = useState();
  const postNewViewCount = data.viewCount[0];
  const postViewCount = data.data[0].views;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
    });
    countPost(id, postViewCount, postNewViewCount);  
  },[]);

    // firebase function re-factor the code
    const countPost = async (id, postViewCount, postNewViewCount) => {
      if (id) {
        const postRef = await firebase.database().ref('posts/'+`${id}/`);
        postRef.update({
          "views" : postViewCount+postNewViewCount,
        })  
      }
      else{
        return
      }
  }

  if ( !data ) {
    return <CircularProgress />
  }
  const board = Object.keys(data).map((item) => data[item])
  const selectedItem = board[0].find( item => item.id === id)

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
        <HumorPost         
          post={data}
          reply={replyData}
          query={query.id}
          user={user}
        />
      </div>
    </main>
    <footer>
    </footer>
    <style jsx>{`
      .main-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10%;
        margin-top: 5%;
      }
      .post-container {
        width: 65%;
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
  const data = await loadPost(query.id);
  const replyData = await loadReply(query.id);

  return {
    data,
    query,
    replyData
  }
}

Humor.propTypes = {
  data: PropTypes.object.isRequired,
  replyData: PropTypes.array,
  query: PropTypes.object.isRequired,
}


export default Humor
