import React from 'react'
import './sidebarButton.css'
import { Link, useLocation } from 'react-router-dom'
import { IconContext } from 'react-icons'

export default function SidebarButton(props) {
    const location = useLocation();
    const isActive = location.pathname === props.to;
    const btnClass = isActive ? 'btnActive' : 'btnBody';
    return (
        <Link to={props.to} onClick={props.onClick}>
            <div className={btnClass}>
                <IconContext.Provider value={{ size: '24px',className:"btn" }}>
                    {props.icon}
                    <p className='btnTitle'>{props.title}</p>
                </IconContext.Provider>
            </div>
        </Link>
    )
}
