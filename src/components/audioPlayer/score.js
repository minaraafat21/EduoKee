import React from 'react';
import './score.css';

const ProgressCircle = ({ score }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="progress-circle">
      <svg width="120" height="120">
        <circle
          className="background"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
        />
        <circle
          className="progress"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score">
        {score}%
      </div>
    </div>
  );
};

export default ProgressCircle;
