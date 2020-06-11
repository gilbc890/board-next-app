import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types';
import Nav from '../../../components/Nav'
import ProductItem from '../../../components/ProductItem'
import { loadProductItem, loadProductReply } from '../../../firebase/db'
import { auth } from '../../../firebase';
import { CircularProgress } from '@material-ui/core';


const Products = (props) => {
    const { data, query, replyData } = props;
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
            <ProductItem 
                product={data}
                reply={replyData}
                query={query.id}
                user={user}
            />
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

Products.getInitialProps = async ({query}) => {
  const data = await loadProductItem(query.id);
  const replyData = await loadProductReply(query.id);

  return {
    data,
    query,
    replyData
  }
}

Products.propTypes = {
  data: PropTypes.object.isRequired,
  replyData: PropTypes.array,
  query: PropTypes.object.isRequired,
}


export default Products