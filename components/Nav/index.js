import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { authWithFacebook, signOut } from '../../firebase/auth';

const Nav = (props) => {
  const { user } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((open) => !open);
  };
  
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className="nav">
      <nav className="nav-container">
        <div className="dropdown-menu">
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <button 
                type="button"
                className="bar-menu"
                onClick={handleClick}
              >
                <MenuIcon/>
              </button>
              {open ? 
                <div className="dropdown-content">
                  <ul>
                    <li>
                      <a href="/humor">유머 커뮤니티</a>
                    </li>
                    <li>
                      <a href="/humor">유머 커뮤니티</a>
                    </li>
                    <li>
                    <a href="/humor">유머 커뮤니티</a>
                    </li>
                    <li>
                      <a href="/humor">유머 커뮤니티</a>
                    </li>
                  </ul>
                </div>
               : 
               <div/>
               }
            </div>
          </ClickAwayListener>
        </div>
        <div className="logo-container">
          <a href="/" className="logo">
            <img src="/logo.png" className="logo-img" alt="logo" />
          </a>
        </div>
        {user ? 
          <button
            className="user-btn"
            onClick={() => signOut()}
          >
            <div className="profile-pic">
              <img 
                src={user.photoURL} 
                alt="Profile Picture"
              />
            </div>
            <div className="username">
              {user.displayName}
            </div>
          </button>
        :
          <button 
          className="log-btn"
          onClick={() => authWithFacebook()}
          >
            로그인
          </button>
        }
      </nav>
      <style jsx>{`
        .nav {
          position: fixed;
          width: 100%;
          background: #fff;
          top: 0;
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 90%;
          margin: auto;
          padding: 1%;
        }
        .bar-menu {
          border: none;
          color: #5680e9;
          cursor: pointer;
        }
        .bar-menu:focus {
          outline: none;
        }
        .dropdown-content {
          position: fixed;
          background: #fff;
          width: 30%;
          height: 100%;
          left: 0;
          padding: 1%;
        }
        .dropdown-content > ul {
          list-style: none;
        }
        .dropdown-content > ul > li {
          padding: 10% 2.5%;
          font-size: 2vw;
        }
        .dropdown-content > ul > li > a {
          color: #5680e9;
          text-decoration: none;
        }
        .fade-enter {
          opacity: 0;
        }  
        .fade-enter-active {
          opacity: 1;
          transition: all 0.5s;
        }
        .fade-exit {
          opacity: 1;
        } 
        .fade-exit-active {
          transition: all 0.5s;
        }
        .logo-container {
          margin: auto;
          text-align: center;
        }
        .logo {
          text-align: center;
        }
        .logo-img {
          width: 10%;
        }
        .log-btn {
          width: 5%;
          height: 4vh;
          background-color: #5680e9;
          color: #fff;
          border-radius: 20px;
        }
        .user-btn {
          background: none;
          border-width: 0;
        }
        .user-btn:focus {
          outline: none;
        }
        .profile-pic {
          text-align: center;
        }
        .profile-pic>img {
          width: 60%;
          border-radius: 50%;
        }
        .username { 
          font-size: 0.9vw;
        }
      `}</style>
    </div>
  )
}

Nav.propTypes = {
  user: PropTypes.object,
}


export default Nav;
