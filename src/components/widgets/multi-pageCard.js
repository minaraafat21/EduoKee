import React, { useState, useEffect, useRef } from 'react';
import './multi-pageCard.css'; // Import your CSS file for styling

const CardWidget = ({ pages, additionalWidget }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (autoRotate) {
      intervalRef.current = setInterval(() => {
        setCurrentPage((current) => (current + 1) % pages.length);
      }, 3000); // Change page every 3 seconds (adjust as needed)
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [autoRotate, pages.length]);

  const nextPage = () => {
    setCurrentPage((current) => (current + 1) % pages.length);
    setAutoRotate(false); // Stop auto rotation when user interacts
  };

  const prevPage = () => {
    setCurrentPage((current) => (current - 1 + pages.length) % pages.length);
    setAutoRotate(false); // Stop auto rotation when user interacts
  };

  return (
    <div className="card-widget">
      <div className="card">
        <div className="card-content" onClick={nextPage}>
          {pages[currentPage]}
        </div>
        <div className="additional-widget">{additionalWidget}</div>
        <div className="card-footer">
          <button onClick={prevPage} disabled={currentPage === 0}>
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardWidget;
