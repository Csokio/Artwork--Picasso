import React from 'react';
import styles from "./DrawerMenu.module.css";
import { useState } from 'react';

const DrawerMenu = ({ drawerMenu, fetchFavorites}) => {
  
  return (
    <div id={ drawerMenu ? styles.openmenu : styles.closemenu }>
   <div>
     <a href="#"><h1>Profil</h1></a>
     <a href="#"><h1>Artists</h1></a>
     <a href="#" onClick={fetchFavorites}><h1>Favorite Pictures</h1></a>
     <a href="#"><h1>Sign Out</h1></a>
    </div>
    </div>
   );
}
 
export default DrawerMenu;