import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import MenuIcon from '@material-ui/icons/Menu';
import { authWithFacebook } from '../../firebase/auth';
// import Session from '../Session';

const Nav = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        setUser(user);
        console.log(user, 'user')
    } else{
        console.log('no log')
    }
    });  
},[]);

  return (
    <div className="nav">
      <nav className="nav-container">
        <button className="bar-menu">
          <MenuIcon/>
        </button>
        <a href="/" className="logo">
            <img src="/logo.png" className="logo-img" alt="logo" />
        </a>
        {user ? 
          <div>
            <div>
              <img src={user.photoURL} alt="Profile Picture"/>
            </div>
            {user.displayName}
          </div>
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
        .nav{
          background: #fff;
        }
        .nav-container{
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 90%;
          margin: auto;
          padding: 1%;
        }
        .bar-menu{
          border: none;
          color: #5680e9;
        }
        .logo{
          width: 50%;
          text-align: center;
        }
        .logo-img{
          width: 10%;
        }
        .log-btn{
          width: 5%;
          height: 4vh;
          background-color: #5680e9;
          color: #fff;
          border-radius: 20px;
        }
      `}</style>
    </div>
  )
}

export default Nav;
