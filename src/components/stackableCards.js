import React, { useState } from 'react';
import './StackableCards.css'; // Import your CSS file

const StackableCards = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction) => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="stackable-cards">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${index === currentIndex ? 'active' : ''}`}
          style={{ zIndex: cards.length - index }}
        >
          {card}
        </div>
      ))}
      <button onClick={() => handleScroll('prev')} disabled={currentIndex === 0}>Previous</button>
      <button onClick={() => handleScroll('next')} disabled={currentIndex === cards.length - 1}>Next</button>
    </div>
  );
};

export default StackableCards;
