import React, { useEffect, useState } from 'react';
import './player.css';
import { useLocation } from 'react-router-dom';
import apiClient from '../../spotify';
import SongCard from '../../components/songCard/songCard';
import Queue from '../../components/queue/queue';
import AudioPLayer from '../../components/audioPlayer';
import Widgets from '../../components/widgets';
import SidebarButton from '../../components/sidebar/sidebarButton';
import { TbMicrophone2 } from 'react-icons/tb';
import { fetchLyrics } from '../../components/widgets/index.js';
import { findBestMatch } from '../../test.js';
import LyricsComparer from '../../components/widgets/lyricComperator.js';
import ScoreCircle from '../../components/audioPlayer/score.js';
// import { transcript } from '../../components/sidebar/index.js';

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    if (location.state) {
      apiClient
        .get('playlists/' + location.state?.id + '/tracks')
        .then((res) => {
          console.log(res.data?.items[0]?.track);
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        })
        .catch((error) => {
          if (error.response.status === 502) {
            console.error('Error 502: Bad Gateway. Playing default track.');
            apiClient.get('tracks/' + location.state?.id).then((res) => {
              if (res.data) {
                console.log('response ' + res.data);
                setCurrentTrack(res.data);
                setTracks(res.data);
              }
              // console.log(res.data);
              // setCurrentTrack(res.data);
              // setTracks([res.data]);
            });
          }
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]); // Update the current track when the currentIndex or tracks change

  useEffect(() => {
    if (currentTrack) {
      fetchLyrics(
        currentTrack?.album?.artists[0].name,
        currentTrack?.name,
        setLyrics
      );
    }
  }, [currentTrack]); // Fetch lyrics when the current track changes

  const [transcript, setTranscript] = useState('');
  const [similarity, setSimilarity] = useState('');
  useEffect(() => {
    setTranscript('');
    setSimilarity('');
  }, [currentTrack]); // Reset the transcript when the current track changes

  const startSpeechToText = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();

      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const newTranscript = event.results[0][0].transcript;
        setTranscript(newTranscript);
      };

      recognition.start(); // Start the recognition

      setTimeout(() => {
        recognition.stop(); // Stop recognition after 30 seconds
      }, 30000);
    } else {
      alert('Your browser does not support speech recognition.');
    }
  };

  const compareLyricsWithTranscript = () => {
    const { similarity, startIndex } = findBestMatch(lyrics, transcript);
    // console.log('Similarity:', similarity);
    // setClientToken(similarity);
    const bestmatch = lyrics.substring(
      startIndex,
      startIndex + transcript.length
    );

    return [bestmatch];
  };
  const compareLyricsWithTranscript2 = () => {
    const { similarity, startIndex } = findBestMatch(lyrics, transcript);
    const score = parseFloat(similarity.toFixed(4));
    console.log('Similarity:', similarity);
    const bestmatch = lyrics.substring(
      startIndex,
      startIndex + transcript.length
    );

    return [score];
  };

  // To use this function in another file, you need to export it from this file.

  const pages = [
    <SongCard album={currentTrack?.album} />,
    // <AudioPLay
  ];
  // const pages2 = [

  // ]

  return (
    <div className="screen-container ">
      <div className="player-container">
        <div className="left-player-body">
          {/* <CardWidget pages={pages} /> */}

          <Widgets
            artistID={currentTrack?.album?.artists[0].id}
            currentTrackName={currentTrack?.name}
            artistName={currentTrack?.album?.artists[0].name}
          />
          
        </div>

        <div className="right-player-body">
          {/* <CardWidget pages={pages} /> */}
          <SongCard
            album={
              tracks.length > 1
                ? tracks[currentIndex]?.track.album
                : tracks.album
            }
          />
          <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
          <LyricsComparer
            lyrics={compareLyricsWithTranscript().toString()}
            transcript={transcript}
          />
          {/* <WidgetCardLyrics title="transcript" lyrics={transcript} />
          <WidgetCardLyrics
            title="lyrics"
            lyrics={compareLyricsWithTranscript().toString()}
          /> */}
          <ScoreCircle score={compareLyricsWithTranscript2() * 100} />
        </div>
      </div>
      <div className="footer">
        <AudioPLayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <SidebarButton
          onClick={startSpeechToText}
          icon={<TbMicrophone2 />}
        ></SidebarButton>
      </div>
    </div>
  );
}
