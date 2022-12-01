import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import GalleryCard from './GalleryCard.jsx'
import styles from "./Gallery.module.css";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';


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

const clickHandler = (item) => {
  setItem(item)
  setMakeLarge(!makeLarge);
  console.log('clickHandler log',item);
}


const [makeLarge, setMakeLarge] = React.useState(false);
const [item, setItem] = React.useState([]);
  return (
    <>
      <div id={styles.wrapper}>
        <ImageList   variant="masonry" cols={4} gap={20}>
          {data.map((item, index) => (
            <GalleryCard 
            clickHandler={clickHandler}
            item={item} key={index}/>
          ))}
        </ImageList>
      </div>

      <div id="modal">
          <img src={item ? '' : item.image} alt="" />
          <h3>{item ? "" : item.title}</h3>
          <h5>{item ? '' : item.artistName}</h5>
          <h6>{item ? '' : item.completitionYear}</h6>
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
        </div>
    </>
    
      );
}

export default Gallery;
