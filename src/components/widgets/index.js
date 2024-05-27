import React, { useState, useEffect } from 'react';
import './widgets.css';
import apiClient from '../../spotify';
import WidgetCardLyrics from './widgetCardLyrics';
import Axios from 'axios';
import Linkify from 'react-linkify';

function removeFirstLine(str) {
  const lines = str.split('\n');

  if (lines[0].startsWith('Paroles')) {
    //based on the api the response always starts with that , but i dont wanna always remove the first line
    lines.shift(); // Remove the first line
  }

  return lines.join('\n');
}

// Function to fetch lyrics
export const fetchLyrics = async (artistName, currentTrackName, setLyrics) => {
  try {
    const response = await Axios.get(
      `https://api.lyrics.ovh/v1/${artistName}/${currentTrackName}`
    );
    const lyrics = removeFirstLine(response.data.lyrics);
    setLyrics(lyrics);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  }
};

export default function Widgets({ artistID, currentTrackName, artistName }) {
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    // Fetch lyrics when artistID, currentTrackName, or artistName changes
    if (artistID && currentTrackName && artistName) {
      fetchLyrics(artistName, currentTrackName, setLyrics);
    }
  }, [artistID, currentTrackName, artistName]);

  const renderLyrics = () => {
    // Split by words and whitespace while preserving formatting
    const wordsWithFormatting = lyrics.match(/\S+|\s+/g) || [];
  
    return wordsWithFormatting.map((segment, index) => {
      // Check if the segment is a word or whitespace
      const isWord = /\S/.test(segment);
  
      return isWord ? (
        <Linkify key={index}>
          <a
            className="lyric-word"
            href={`https://www.google.com/search?q=${segment}+definition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment}
          </a>{' '}
        </Linkify>
      ) : (
        <span key={index}>{segment}</span>
      );
    });
  };

  return (
    <div className="widgets-body flex">
      {/* <WidgetCardLyrics title="Lyrics" lyrics={lyrics} /> */}
      <WidgetCardLyrics title="Lyrics" lyrics={renderLyrics()} />
    </div>
  );
}
