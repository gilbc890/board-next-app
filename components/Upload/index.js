import React, { useState } from 'react';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import sanitizeHtml from 'sanitize-html';
import firebase from 'firebase/app';

const Upload = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState();
    const [img, setImg] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);
    const [postTag] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const saveTags = async (key, tags) => {
        const filteredTags = tags.match(/#[가-힣a-zA-Z]+/g);
        let tagData = [];
        filteredTags.map((item) => {
            tagData.push(item.replace('#', ''))
        })

        if(tagData){
            await tagData.map((item)=> {
                if(item){
                    const tagRef = firebase.database().ref('humor/tags/'+`${item}/`+key);
                    tagRef.update({
                        key
                    });
                    postTag.push(item)
                } else{
                    return;
                }
            })    
        } else {
            return
        }
    }
    
    // firebase function re-factor the code
    const savePost = async () => {
        const user = firebase.auth().currentUser;
        const userId = firebase.auth().currentUser.uid;
        const ref = await firebase.database().ref('humor/posts/');
        const key = ref.push().key;
        
        const postRef = await firebase.database().ref('humor/posts/'+key);
        const userRef = await firebase.database().ref('users/'+userId+'/humor/posts/'+key);
        const timestamp = new Date().getTime();

        saveTags(key, tags)
        postRef.update({
            "author" : {
                author_img: user.photoURL,
                author_name: user.displayName,
                author_uid: userId,
                },
            "content": text,
            "timestamp": timestamp,
            "id": key,
            "img": img,
            "title": title,
            "views": 1,
            "tags": postTag,
        })
        userRef.update({
            "author" : {
                author_img: user.photoURL,
                author_name: user.displayName,
                author_uid: userId,
                },
            "content": text,
            "timestamp": timestamp,
            "id": key,
            "img": img,
            "title": title,
            "views": 1,
            "tags": postTag,
        })
        handleClose();
        window.location.reload();
    }
      
    return(
    <div className="upload">
        <button 
            className="upload-btn"
            onClick={handleOpen}
        >
            <AddCircleRoundedIcon 
                fontSize="large"
                style={{fill:"#5680e9", borderRadius:"50%", backgroundColor:"#fff"}}
            />
        </button>

        <Modal
            open={open}
            onClose={handleClose}
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Slide in={open} direction="down">
            <div className="content-wrap">
                <div className="content-title">
                    <input 
                    type="text" 
                    className="title-input"
                    placeholder="제목을 입력해주세요"
                    onChange={(e) => setTitle(sanitizeHtml(e.currentTarget.value))}
                    />
                </div>
                <div className="content">
                    <div className="img-input-wrap">
                        <input 
                            type="text" 
                            className="img-input"
                            placeholder="이미지 주소를 입력해주세요 eg)https://media.giphy.com/media/3o7527pa7qs9kCG78A/giphy.gif"
                            onChange={(e) => setImg(sanitizeHtml(e.currentTarget.value).replace(/[`~!@#$%^&*()_|+\-=?;'",<>\\{\\}\\[\]\\]/gi, ''))}
                        />
                    </div>
                    <textarea 
                        className="content-input" 
                        name="content text" 
                        cols="30" 
                        rows="10"
                        placeholder="내용을 입력해주세요"
                        onChange={(e) => setText(sanitizeHtml(e.currentTarget.value))}
                    />
                    <div className="tag-input-wrap">
                        <input 
                            type="text" 
                            className="tag-input"
                            placeholder="태그를 입력해주세요 eg)#태그"
                            onChange={(e) => setTags(sanitizeHtml(e.currentTarget.value)) }
                        />
                    </div>
                    <button
                        className="submit-btn"
                        disabled={!title}
                        onClick={() => savePost()}
                    >
                        등록
                    </button>
                </div>
            </div>
            </Slide>
        </Modal>
        <style jsx>{`
            .upload-btn {
                border-radius:50%;
                color: #5680e9;
                border: none;
                position: fixed;
                right: 5%;
                bottom: 5%;
                background: none;
                cursor: pointer;
            }
            .content-wrap { 
                width: 40%;
                outline: none;
                background: #fff;
                padding: 5%;
                border-radius: 20px;
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
                background: #121212;
                color: #fff;
            }
            .content {
                margin: 2.5% auto 0;
                overflow: hidden;
                text-align: center;
            }
            .img-input-wrap {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }
            .img-input {
                width: 100%;
                padding: 1% 2.5%;
                border-radius: 20px;
                background: #121212;
                color: #fff;
                font-size: 0.8vw;
            }
            .tag-input {
                width: 40%;
                padding: 1% 2.5%;
                border-radius: 20px;
                background: #121212;
                color: #fff;
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
                background: #121212;
                color: #fff;
            }
            .submit-btn {
                border-radius: 20px;
                padding: 1.5% 3%;
                margin-top: 1%;
                font-size: 1.6vw;
                cursor: pointer;
                background: #5680e9;
                color: #fff;
                border: 2px solid #fff;
            }
            .submit-btn:disabled {
                cursor: not-allowed;
            }
        `}</style>
    </div>
    )
}

export default Upload;
