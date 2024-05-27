import React from 'react';
// import { IoLogIn } from 'react-icons/io5';
import { FaSpotify } from 'react-icons/fa';
import { loginEndpoint } from '../../spotify';
import './login.css';

export default function Login() {
  return (
    <div className='login-page'>
      <FaSpotify className='login-icon' />
      <a href={loginEndpoint}>
        <div className='login-btn'>
          
          Login with Spotify
        </div>
      </a>
    </div>
  );
}
