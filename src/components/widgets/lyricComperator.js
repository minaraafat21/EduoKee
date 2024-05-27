import React from 'react';
import './LyricsComparer.css';

class LyricsComparer extends React.Component {
    compareLyrics = (lyrics, transcript) => {
        const lyricsWords = lyrics.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(' ');
        const transcriptWords = transcript.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(' ');
        // i dont care about punctuation nor case sensitivity
        

        const transcriptWordCounts = transcriptWords.reduce((counts, word) => {
            counts[word] = (counts[word] || 0) + 1;
            return counts;
        }, {});

        const result = lyricsWords.map((word, index) => {
            const existsInTranscript = transcriptWordCounts[word] > 0;
            if (existsInTranscript) {
                transcriptWordCounts[word]--;
            }

            const correct = existsInTranscript;
            return (
                <span
                    key={index}
                    className={correct ? 'correct' : 'incorrect'}
                >
                    {word+ ' '} 
                    {/* add the space removed by span */}
                </span>
            );
        });

        return result;
    }

    render() {
        const { lyrics, transcript } = this.props;
        return (
            <div>
                {this.compareLyrics(lyrics, transcript )}
            </div>
        );
    }
}

export default LyricsComparer;
