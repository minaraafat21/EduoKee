import React, { useState, useEffect } from 'react'
import './sideBar.css'
import SidebarButton from './sidebarButton'
import { IoHome } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { LuMusic2 } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import apiClient from "../../spotify";
import Library from '../../Pages/library/library';


export default function Sidebar() {
  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  }
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );



  
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
      console.log(response);
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error here
        console.log("Unauthorized error");
      } else {
        // Handle other errors here
        console.log("Error:", error);
      }
    });
  }, []);


  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const handleProfileClick = () => {
    setSidebarVisible(!isSidebarVisible);
  };


  
  
  return (
    <div className='sidebar-container'>
      <img src={image} className= "profile-picture" alt='avatar' onClick={handleProfileClick} />
      
      <div className='sidebar-button'>
        <SidebarButton title="library" to="/" icon={<IoHome />} />
        {/* <SidebarButton title="trending" to="/trending" icon={<IoIosTrendingUp />} /> */}
        <SidebarButton title="favorites" to="/favorites" icon={<GoHeartFill />} />
        <SidebarButton title="player" to="/player" icon={<LuMusic2 />} />
      </div>
      
        
      
      <SidebarButton title="logout" icon={<IoIosLogOut />} onClick={handleLogout} />
    </div>
  )
 
}


  
