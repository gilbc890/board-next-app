import Head from 'next/head'
import Nav from '../../../components/Nav'
import Main from '../../../components/Main'
import { loadDB } from '../../../firebase/db'

const Humor = (props) => {
  const id = parseInt(props.query.id);
  const data = props.data[0];
  const board = Object.keys(data).map((item) => data[item])
  const selectedItem = board.find( item => item.id === id)

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
    <Nav/>
    <Main data={props} />
    <footer>
    </footer>
    <style jsx>{`
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
    query
  }
}

export default Humor