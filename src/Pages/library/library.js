import React, { useEffect } from 'react';
import APIKIT from '../../spotify';
import './library.css';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import CardWidget from '../../components/widgets/multi-pageCard';
import Favourites from '../favourites/favourites.js';
import { CiHeart } from "react-icons/ci";
import { MdOutlinePlaylistPlay } from "react-icons/md";
export default function Library() {
  const [playlists, setPlaylists] = React.useState(null);
  useEffect(() => {
    APIKIT.get('/me/playlists').then(function (response) {
      setPlaylists(response.data.items);
      // console.log(response.data);
    });
  }, []);
  // //////////////////////////////////////////////////////////////
  // const [tracks, setTracks] = React.useState(null);

  // useEffect(() => {
  //   APIKIT.get('/me/tracks').then(function (response) {
  //     console.log(response.data.items);
  //     setTracks(response.data.items.map((item) => item.track));
  //   });
  // }, []);
  // //////////////////////////////////////////////////////////////

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate('/player', { state: { id: id } });
  };
  return (
    <div className="screen-container">
      
      <div className="library-body">
        {/* <CardWidget pages={pages} /> */}
        <div className='playlist-row'>
          <MdOutlinePlaylistPlay size={50} color='white' />
          
          <div className='playlists'>
            
            {playlists?.map((playlist) => (
              
                  <div
                    className="playlist-card"
                    onClick={() => playPlaylist(playlist.id)}
                  >
                    <img
                      src={playlist.images[0].url}
                      className="playlist-image"
                      alt="playlist"
                    />

                    <div className="playlist-fade">
                      
                    </div>
                    <p className="playlist-name">{playlist.name}</p>
                  </div>
                ))}
          </div>
        </div>
      


        <div className="fav">
        <CiHeart size={50} color='white' />
          <Favourites />
        </div>
        
      </div>
    </div>
  );
}
