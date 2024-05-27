import React from 'react'
import './widgetCardLyrics.css';

export default function WidgetCardLyrics({title,lyrics}) {
  return (
    <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
      <div className="lyrics-container">
            {lyrics}
       </div>
        <div className="widget-fade">
            <div className="fade-button">
            </div>
        </div>
    </div>
  )
}
