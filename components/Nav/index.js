import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import MenuIcon from '@material-ui/icons/Menu';
import { authWithFacebook, signOut } from '../../firebase/auth';

const Nav = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
    if (user) {
        setUser(user);
    } 
    });  
},[]);

  return (
    <div className="nav">
      <nav className="nav-container">
        <button className="bar-menu">
          <MenuIcon/>
        </button>
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
          background: #fff;
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

export default Nav;
