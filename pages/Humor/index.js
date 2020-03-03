import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';
import Nav from '../../components/Nav'
import WeeklyAside from '../../components/WeeklyAside'
import HumorBoard from '../../components/HumorBoard'
import Upload from '../../components/Upload'

import { loadDB } from '../../firebase/db'
import { CircularProgress } from '@material-ui/core';

const Humor = (props) => {
  const router = useRouter();
  const currentPageNumber = router.query.page;

  const data = props.data;
  const query = props.query;
  // const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(currentPageNumber);

  const totalPost = data.dataLength; //from database
  const perPage = 5;
  const totalPage = Math.ceil(totalPost / perPage)

  useEffect(() => {
    settingPageNumber(),
    settingEndPage()
  }, []);

  const settingPageNumber = () => {
    if(!currentPageNumber){
      setCurrentPage(1);
    }
    setCurrentPage(currentPageNumber)
  }
  const settingEndPage = () => {
    setEndPage(totalPage)
  }

  if ( !data ) {
    return <CircularProgress />
  }

  return(
    <div className="container">
    <Head>
      <title></title>
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
    <Nav/>
    <main className="main-container">
      <WeeklyAside/>
      <HumorBoard 
        board={data}
        query={query}
        currentPage={currentPage}
        perPage={perPage}
        endPage={endPage}
      />
      <Upload/>
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
  const data = await loadDB();

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
