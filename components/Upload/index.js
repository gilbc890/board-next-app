import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const Upload = () => (
    <div className="upload">
        <button className="upload-btn">
            <AddCircleRoundedIcon/>
        </button>
        <style jsx>{`
            .upload-btn{
                border-radius: 50%;
                color: #fff;
                background: #5680e9;
                border: none;
                font-size: 3vw;
                position: fixed;
                right: 5%;
                bottom: 5%;
                padding-bottom: 6px;
            }
            
        `}</style>
    </div>
)

export default Upload;
