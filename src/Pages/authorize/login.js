import React from 'react';
// import { IoLogIn } from 'react-icons/io5';
import { FaSpotify } from 'react-icons/fa';
import { loginEndpoint } from '../../spotify';
import logo from './Eduokee.svg';
import './login.css';

export default function Login() {
  return (
    <div className='login-page'>
      <img src={logo} alt='Logo' className='eduokee' />
      <FaSpotify className='login-icon' />
      <a href={loginEndpoint}>
        <div className='login-btn'>
          
          Login with Spotify
        </div>
      </a>
    </div>
  );
}
