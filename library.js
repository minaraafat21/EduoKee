import React, { useEffect } from 'react';
import APIKIT from '../../spotify';
import './library.css';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import CardWidget from '../../components/widgets/multi-pageCard';
import Favourites from '../favourites/favourites.js';
import { CiHeart } from 'react-icons/ci';
import { MdOutlinePlaylistPlay } from 'react-icons/md';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StackableCards from '../../components/stackableCards.js';
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

  const cards = [
    
    <div>Card 2</div>,
    <div>Card 3</div>,
    // Add more cards as needed
  ];

  

  return (
    <div className="screen-container">
      <div className="library-body">
        {/* <CardWidget pages={pages} /> */}
        
        <div className="playlist-row">
          <MdOutlinePlaylistPlay size={60} color="white" />

          {/* <div className="playlists">
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

                <div className="playlist-fade"></div>
                <p className="playlist-name">{playlist.name}</p>
              </div>
            ))}
          </div> */}
          <div className="playlists">
          <StackableCards cards={cards} />
      <Slider 
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        centerPadding='0px'
        centerMode={true}
        swipeToSlide={ true} // Enable swipe to slide
        draggable={ true}     // Enable mouse dragging
        className='custom-slider'
        
        >
          {playlists?.map((playlist) => (
            <div
              key={playlist.id}
              className="playlist-card"
              onClick={() => playPlaylist(playlist.id)}
            >
              <img
                src={playlist.images[0].url}
                className="playlist-image"
                alt="playlist"
              />
              <div className="playlist-fade"></div>
              <p className="playlist-name">{playlist.name}</p>
            </div>
        ))}
      </Slider>
    </div>
        </div>

        <div className="fav">
          <CiHeart size={50} color="white" />
          <Favourites />
        </div>

        
      </div>
    </div>
  );
}
