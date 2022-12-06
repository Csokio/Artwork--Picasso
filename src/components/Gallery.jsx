import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import GalleryCard from './GalleryCard.jsx'
import styles from "./Gallery.module.css";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { StyledEngineProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress";


function Gallery({ favorites, isFavorites, loginPopUp, mostViewed, isData, searchArtist, isSearchArtist, searchTerm, isSearchTerm, token}) {
  
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
]

const clickHandler = (item) => {
  setItem(item)
 token ? handleOpen() : loginPopUp()
  
}

const loadHandler = () => {
  setLoading(!loading);
}

const [item, setItem] = React.useState([]);
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [loading, setLoading] = React.useState(false);

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

  return (
    <>
    <StyledEngineProvider injectFirst>
      <div id={styles.wrapper}>      
        <ImageList id={styles.gallery}  variant="masonry" cols={4} gap={15} >
          {isData && !isSearchArtist && !isSearchTerm &&
          mostViewed.data.map((item, index) => (
            <GalleryCard 
            token ={token}
            loginPopUp={loginPopUp}
            clickHandler={clickHandler}
            item={item} key={index}/>
          ))}
          {!isData && isSearchArtist && !isSearchTerm && searchArtist.data != undefined &&
          searchArtist.data.map((item, index) => (
            <GalleryCard 
            token ={token}
            loginPopUp={loginPopUp}
            clickHandler={clickHandler}
            item={item} key={index}/>
          ))}
          {!isData && !isSearchArtist && isSearchTerm && searchTerm.data != undefined &&
          searchTerm.data.map((item, index) => (
            <GalleryCard 
            token ={token}
            loginPopUp={loginPopUp}
            clickHandler={clickHandler}
            item={item} key={index}/>
          ))}
           {!isData && !isSearchArtist && !isSearchTerm && isFavorites && favorites != undefined &&
          favorites.map((item, index) => (
            <GalleryCard 
            token ={token}
            loginPopUp={loginPopUp}
            clickHandler={clickHandler}
            item={item} key={index}/>
          ))}
        </ImageList>
      </div>
      </StyledEngineProvider>
      <button onClick={loadHandler}>{loading ? <CircularProgress size={30} /> : "Load more"}</button>
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
           <img src={item.image} alt={item.title} />
           <h2>{item.title}</h2>
           <h2>{item.artistName}</h2>
           <h2>{item.completitionYear}</h2>
           <Autocomplete
        multiple
        id="tags-filled"
        options={top100Films.map((option) => option.title)}
        defaultValue={[top100Films[5].title]}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="freeSolo"
            placeholder="Favorites"
          />
         
        )}
      />
       <button>Save Artwork</button>
          </Box>
        </Fade>
      </Modal>
    </>
    
      );
}

export default Gallery;
