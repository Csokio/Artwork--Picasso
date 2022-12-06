import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import getData from "./utility/getMostViewed";
import getArtists from "./utility/getArtists";
import Gallery from "./components/Gallery.jsx";
import Menubar from "./components/Menubar.jsx";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import DrawerMenu from "./components/DrawerMenu";
import getFavouritePictures from "./utility/getFavoritPictures";

const App = () => {

// LOGIN & SIGNUP & MODAL 

const loginPopUp = () => {
  setOpen(true)
}

  const signup = async (username, password) => {
    const response = await fetch ("http://localhost:3333/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },  
        body : JSON.stringify({username, password})    
    })
    return  response.status
  }

  const signupHandler = async () => {
    const response = await signup(username, password)
    setUsername("")
    setPassword("")
    response === 204 ? alert("Signup done") : alert("Username already in use")
    setPage("login")
  }

  const login = async (username, password) => {
    const response = await fetch ("http://localhost:3333/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },  
        body : JSON.stringify({username, password})    
    })

    const id = await response.json()
    return id
  }

  const loginHandler = async () => {
    // const userId = await login()
    // if (!userId) {
    //   return alert("Wrong credentials")
    // }
    // localStorage.setItem("sessionId", userId)
    const token = await login(username, password)
    tokenHandler(token)
    setUsername("")
    setPassword("")
    alert("Login done")
  }

  const tokenHandler = (token) => {
    setToken(token)
  }
  const [token, setToken] = useState("")
  const [ page, setPage ] = React.useState("signup")
  const [ username, setUsername ] = React.useState("")
  const [ password, setPassword ] = React.useState("")
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
 const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  // DRAWER MENU
  const [drawerMenu, setDrawerMenu] = useState(false);

  const drawerMenuHandler = () => {
    setDrawerMenu(!drawerMenu)
  }

// DATA MANAGMENT

  const [mostViewed, setMostViewed] = useState([]);
  const [isData, setIsData] = useState(true);
  const [artists, setArtists] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const [searchArtist, setSearchArtist] = useState(mostViewed);
  const [isSearchArtist, setisSearchArtist] = useState(false);
  const [searchTerm, setSearchTerm] = useState(mostViewed);
  const [isSearchTerm, setIsSearchTerm] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavorites, setIsFavorites] = useState(false);
  const [tags, setTags] = useState();

  useEffect(() => {
    const init = async () => {
      setMostViewed(await getData());
      setArtists(await getArtists());
    };
    init();
  }, []);

// DATA FETCH

const fetchFavorites = async () => {
  setFavorites(await getFavouritePictures(token))
  setIsFavorites(!isFavorites) 
  setIsData(false)
  setisSearchArtist(false)
  setIsSearchTerm(false)
}

  const getArtsByPainterId = async (artist) => {
    setIsOn(!isOn);
    setIsData(false);
    setisSearchArtist(true);
    setIsSearchTerm(false);
    const url = "http://localhost:3333/pba";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist }),
    });

    const artistPaintings = await response.json();
    console.log(artistPaintings);
    setSearchArtist(artistPaintings);
    setIsOn(false);
  };

  const getArtsByKeyWord = async (term) => {
    setIsOn(!isOn);
    setIsData(false);
    setisSearchArtist(false);
    setIsSearchTerm(true);
    const url = "http://localhost:3333/pbsearch";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term }),
    });

    const searchTerm = await response.json();
    term === "" ? setSearchTerm(mostViewed) : setSearchTerm(searchTerm);
    setIsOn(false);
  };

  return (
    <>
   <DrawerMenu  drawerMenu={drawerMenu} fetchFavorites={fetchFavorites}/>
      <Menubar
      loginPopUp={loginPopUp}
      token={token}
      drawerMenuHandler={drawerMenuHandler}
        onChange={getArtsByPainterId}
        onInput={getArtsByKeyWord}
        tokenHandler={tokenHandler}
        artists={artists === null ? [] : artists}
      />
      {mostViewed.data != undefined ? (
        <Gallery
          {...{
            favorites,
            isFavorites,
            loginPopUp,
            mostViewed,
            isData,
            searchArtist,
            isSearchArtist,
            searchTerm,
            isSearchTerm,
            token,
          }}
        />
      ) : (
        <div id="loading">
          <CircularProgress size={170} />
        </div>
      )}
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          { page === "signup" && (
        <main>
          <p>Signup</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}/>
          <button onClick={signupHandler}>Signup</button>
          <button onClick={() => setPage("login")}>To login</button>
        </main>)}
      
      { page === "login" && (
        <main>
          <p>Login</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}/>
          <button onClick={loginHandler}>Login</button>
          <button onClick={() => setPage("signup")}>To signup</button>
        </main>)}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default App;
