import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

const Upload = () => (
    <div className="upload">
        <span className="upload-btn">
            <AddCircleRoundedIcon 
                fontSize="large"
                style={{fill:"#5680e9", borderRadius:"50%", backgroundColor:"#fff"}}
            />
        </span>

        <style jsx>{`
            .upload-btn{
                border-radius:50%;
                color: #5680e9;
                border: none;
                position: fixed;
                right: 5%;
                bottom: 5%;
            }
            
        `}</style>
    </div>
)

export default Upload;
