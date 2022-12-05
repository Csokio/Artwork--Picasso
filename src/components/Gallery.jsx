import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import GalleryCard from './GalleryCard.jsx'
import styles from "./Gallery.module.css";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { StyledEngineProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

function Gallery({ data }) {
  
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }
]

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

const clickHandler = (item) => {
  setItem(item)
  handleOpen()
}

const loadHandler = () => {
  setLoading(!loading);
}

const [item, setItem] = React.useState([]);
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [loading, setLoading] = React.useState(false);


  return (
    <>
    <StyledEngineProvider injectFirst>
      <div id={styles.wrapper}>
      
        <ImageList id={styles.gallery}  variant="masonry" cols={4} gap={15} >
          {data.map((item, index) => (
            <GalleryCard 
            clickHandler={clickHandler}
            item={item} key={index}/>
          ))}
        </ImageList>
        
      </div>

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
          <img src={item.image} alt="" />
          <Autocomplete
            multiple
            id="tags-filled"
            options={top100Films.map((option) => option.title)}
            defaultValue={[top100Films[1].title]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
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
          <h3>{item.title}</h3>
          <h5>{item.artistName}</h5>
          <h6>{item.completitionYear}</h6>
          </Box>
        </Fade>
      </Modal>
      </StyledEngineProvider>
      <button onClick={loadHandler}>{loading ? <CircularProgress size={30} /> : "Load more"}</button>
    </>
    
      );
}

export default Gallery;
