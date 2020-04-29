import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Nav from '../../components/Nav'
import { auth } from '../../firebase';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const Write = () => {
  const [user, setUser] = useState();
  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [text, setText] = useState();
  const [moreImg, setMoreImg] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
    });
  },[]);

  const addImg = () => {
    return(
      <input 
        type="text" 
        className="img-input"
        placeholder="이미지 주소를 입력해주세요"
        value={(e) => setImg(e.currentTarget.value) }
      />
    )
  }
  const savePost = () => {
    console.log('save')
  }

  return(
    <div className="container">
    <Head>
      <title>글쓰기</title>
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
    <main className="write-container">
      <div className="content-wrap">
        <div className="content-title">
          <input 
            type="text" 
            className="title-input"
            placeholder="제목을 입력해주세요"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div className="content">
          <div className="img-write-wrap">
            <input 
              type="text" 
              className="img-input"
              placeholder="이미지 주소를 입력해주세요"
              onChange={(e) => setImg(e.currentTarget.value) }
            />
          </div>
          <textarea 
            className="content-input" 
            name="content text" 
            cols="30" 
            rows="10"
            placeholder="내용을 입력해주세요"
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <button
            className="submit-btn"
            onClick={() => savePost()}
          >
            등록
        </button>

        </div>
      </div>
    </main>
    <footer>
    </footer>
    <style jsx>{`
      .write-container {
        padding: 10%;
      }
      .content-title {
        width: 100%;
        overflow: hidden;
      }
      .title-input {
        width: 100%;
        padding: 1% 2.5%;
        border-radius: 20px;
        font-size: 1.6vw;
        box-sizing: border-box;
      }
      .content {
        margin: 5% auto;
        overflow: hidden;
        text-align: center;
      }
      .img-write-wrap {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      .img-input {
        width: 100%;
        padding: 1% 2.5%;
        border-radius: 20px;
      }
      .plus-btn {
        overflow: hidden;
        background: none;
        border: none;
        cursor: pointer;
      }
      .content-input {
        width: 100%;
        display: block;
        margin: 1.5% 0;
        padding: 2.5%;
        border-radius: 20px;
        box-sizing: border-box;
        font-size: 1.6vw;
      }
      .submit-btn {
        border-radius: 20px;
        padding: 1.5% 3%;
        font-size: 1.6vw;
        cursor: pointer;
        background: #5680e9;
        color: #fff;
        border: 2px solid #fff;
      }

    `}
    </style>
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

export default Write;
