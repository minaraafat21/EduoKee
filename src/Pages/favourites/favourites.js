import React, { useEffect } from 'react';
import APIKIT from '../../spotify';
import './favourites.css';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import CardWidget from '../../components/widgets/multi-pageCard';

export default function Favourites() {
  const [playlists, setPlaylists] = React.useState(null);
  useEffect(() => {
    APIKIT.get('/me/playlists').then(function (response) {
      setPlaylists(response.data.items);
      // console.log(response.data);
    });
  }, []);

  useEffect(() => {
      APIKIT.get('/me/tracks').then(function (response) {
        console.log(response.data.items);
      });
    }, []);

    // //////////////////////////////////////////////////////////////
    const [tracks, setTracks] = React.useState(null);

    useEffect(() => {
      APIKIT.get('/me/tracks', {
        params: {
          limit: 50,
        }
      })
      .then(function (response) {
        // console.log(response.data.items);
        setTracks(response.data.items.map((item) => item.track));
      });
    }, []);
    // //////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  
  const playPlaylist = (id) => {
    navigate('/player', { state: { id: id } });
  };
  return (
    
      <div className="library-body">
        {/* <CardWidget pages={pages} /> */}
        {tracks?.map((track) => (
          <div className="playlist-card" onClick={() => playPlaylist(track.id)}> 
          {/* just gonna steal the style */}
          <img
              src={track.album.images[0].url}
              className="playlist-image"
              alt="playlist"
            />
            
            <p className="playlist-name">{track.name}</p>

          </div>
        ))}
        
      </div>
      
    
  );
}
