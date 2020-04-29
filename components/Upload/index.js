import React, { useState } from 'react';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

const Upload = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState();
    const [img, setImg] = useState();
    const [text, setText] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const savePost = () => {
        console.log('save')
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
            </Slide>
        </Modal>
        <style jsx>{`
            .upload-btn{
                border-radius:50%;
                color: #5680e9;
                border: none;
                position: fixed;
                right: 5%;
                bottom: 5%;
                background: none;
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
            .img-write-wrap {
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
                font-size: 1.6vw;
                cursor: pointer;
                background: #5680e9;
                color: #fff;
                border: 2px solid #fff;
            }
        `}</style>
    </div>
    )
}

export default Upload;
