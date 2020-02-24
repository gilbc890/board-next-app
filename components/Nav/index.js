import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Nav = () => (
  <div className="nav">
    <nav className="nav-container">
      <button className="bar-menu fa-2x">
        <FontAwesomeIcon icon={faBars} />
      </button>
      <a href="/" className="logo">
           <img src="/logo.png" className="logo-img" alt="logo" />
       </a>
       <button className="log-btn">
           로그인
       </button>
    </nav>
    <style jsx>{`
      .nav{
        background:#fff;
      }
      .nav-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:90%;
        margin:auto;
        padding:1%;
      }
      .bar-menu{
        border:none;
        color:#5680e9;
      }
      .logo{
        width:50%;
        text-align:center;
      }
      .logo-img{
        width:10%;
      }
      .log-btn{
        width:5%;
        height:4vh;
        background-color:#5680e9;
        color:#fff;
        border-radius:20px;
      }
    `}</style>
  </div>
)

export default Nav;
