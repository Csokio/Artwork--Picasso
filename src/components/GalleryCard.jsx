import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import styles from "./GalleryCard.module.css";


const GalleryCard = ({item, clickHandler}) => {

    const [favorite, setFavorite] = React.useState(false);
    const favoriteHandler = () => {
        setFavorite(!favorite);
      }

    return (
        <ImageListItem>
          <img
            onClick={() => clickHandler(item)}
            src={`${item.image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
            }}
            // title="Add to Favourite"
            position="top"
            actionIcon={
              favorite ? (
                <IconButton
                  className="icon"
                  onClick={() => favoriteHandler()}
                  sx={{ color: "white" }}
                  aria-label={`star ${item.title}`}
                >
                  <Favorite />
                </IconButton>
              ) : (
                <IconButton
                  className="icon"
                  onClick={favoriteHandler}
                  sx={{ color: "white" }}
                  aria-label={`star ${item.title}`}
                >
                  <FavoriteBorder />
                </IconButton>
              )
            }
            actionPosition="right"
          />
          <h3>{item.title}</h3>
          <h5>{item.artistName}</h5>
          <h6>{item.completitionYear}</h6>
        </ImageListItem>
    );
}
 
export default GalleryCard;