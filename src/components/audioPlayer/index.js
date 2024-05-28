import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";


export default function AudioPLayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0); // work with tracks also npt playlist
  

  // total.preview if you replace this with current track it should work but the tracks would be shifted
  var audioSrc =  total.length > 1 ? total[currentIndex]?.track?.preview_url : total?.preview_url;
  console.log("curr", total);
  console.log("curr", currentTrack);
  const audioRef = useRef( total.length > 1 ? new Audio(total[0]?.track?.preview_url) : new Audio(total?.preview_url));

  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.log(error));
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play().catch(error => console.log(error));
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play().catch(error => console.log("")); // handle edge case where user goes to home without playing anything
      // setIsPlaying(true);   MUST be initiallyu paused
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    setIsPlaying(true);
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
      
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    setIsPlaying(true);
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };
  const artists = [];
  (currentTrack?.album?.artists || total?.album?.artists || []).forEach((artist) => {
    artists.push(artist.name);
  });
  return (
    <div className="player-body">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          image={currentTrack?.album?.images[0]?.url}
          size={90}
          color="#C96850"
        />

        <div className="title">
          {console.log("currentTrack")}
          <p className="song-title">{currentTrack?.name ? currentTrack.name : total?.name}</p>
          <p className="song-artist">{artists.join(" | ")}</p>
        </div>

      </div>
      
      <div className="player-right-body ">
          {/* <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div> */}
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
      
      </div>
    </div>
  );
}
