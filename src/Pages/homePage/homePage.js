import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from '../library';
import Favourites from '../favourites';
import Player from '../player';
import Trending from '../trending';
import Feed from '../feed';
import './home.css';
import SideBar from '../../components/sidebar';

export default function HomePage() {
  return (
    <Router>
      <div className="main">
        <SideBar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/player" element={<Player />} />\
          <Route path="/trending" element={<Trending />} />
          <Route path="/feed" element={<Feed />} />
          {/* <div>
              this is home page
              </div> */}
        </Routes>
      </div>
    </Router>
  );
}
