import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from '../library/library';
import Favourites from '../favourites/favourites';
import Player from '../player/player';
import Trending from '../trending';
import Feed from '../feed';
import './home.css';
import SideBar from '../../components/sidebar';
import Login from '../authorize/login';
import { setClientToken, getRefreshToken } from '../../spotify';
import AudioPLayer from '../../components/audioPlayer';

export default function HomePage() {
  const [token, setToken] = useState('');

  useEffect(() => {
    let token = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash = '';
    if (!token && hash) {
      // console.log(hash);
      const _token = hash.split('&')[0].split('=')[1];
      // console.log(_token);
      window.localStorage.setItem('token', _token);
      setToken(_token);

      setClientToken(_token);
    }
    if (token) {
      console.log(token);
      setToken(token);
      // console.log(token);
      setClientToken(token);
    } else {
      console.log('No token found');
      // refresh token
      getRefreshToken(); // maybe i should redirect to login dont know yet
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router> 
      <div className="main">
        <SideBar />
        
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/player" element={<Player />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      
      </div>
      
    </Router>
  );
}
