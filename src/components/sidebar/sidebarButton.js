import React from 'react'
import './sidebarButton.css'
import { Link, useLocation } from 'react-router-dom'
import { IconContext } from 'react-icons'

export default function SidebarButton(props) {
    const location = useLocation();
    const isActive = location.pathname === props.to;
    // {/*this is an if condition, : 'btnBody'; this is the else condition.*/}
    const btnClass = isActive ? 'btnActive' : 'btnBody';
  return (
    <Link to= {props.to}>
    <div className={btnClass}>
    {/*set icon size. */}
        <IconContext.Provider value={{ size: '24px',className:"btn" }}>
        {props.icon}
        
        <p className='btnTitle'>{props.title}</p>
        </IconContext.Provider>
      
    </div>
    </Link>
  )
}
