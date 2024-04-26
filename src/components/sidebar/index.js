import React from 'react'
import './sideBar.css'
import SidebarButton from './sidebarButton'
import { IoHome } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import { GoHeartFill } from "react-icons/go";
import { LuMusic2 } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";

export default function SideBar() {
  return (
    <div className='sidebar-container'>
        <img src='https://www.w3schools.com/howto/img_avatar.png' className= "profile-picture" alt='avatar' />
        sidebar
        <div className='sidebar-button'>
            <SidebarButton title="library" to="/library" icon={<IoHome />} />
            <SidebarButton title="trending" to="/trending" icon={<IoIosTrendingUp />} />
            <SidebarButton title="favorites" to="/favorites" icon={<GoHeartFill />} />
            <SidebarButton title="player" to="/player" icon={<LuMusic2 />} />
            
        </div>
        <SidebarButton title="logout" icon={<IoIosLogOut />} />
    </div>
  )
}
