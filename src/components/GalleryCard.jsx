import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import HeartBroken from "@mui/icons-material/HeartBroken";
import { StyledEngineProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import styles from "./GalleryCard.module.css";
import { style } from "@mui/system";

const GalleryCard = ({ item, clickHandler, token, loginPopUp }) => {
  const saveFavorite = async (item) => {
    // UTILS
    var processStatus = function (response) {
      // process status
      if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error("Error loading: " + "harcsamacska"));
      }
    };

    var parseBlob = function (response) {
      return response.blob();
    };

    var parseJson = function (response) {
      return response.json();
    };

    const pictureUrl = item.image;

    // download/upload
    var downloadFile = function (pictureUrl) {
      return fetch(pictureUrl).then(processStatus).then(parseBlob);
    };

    function uploadImageToBackend(blob) {
      var formData = new FormData();
      formData.append("title", item.title);
      formData.append("year", item.completitionYear);
      formData.append("artist", item.artistName);
      formData.append("pictureId", item.id);
      formData.append("artistId", item.artistId);
      formData.append("image", blob);

      return fetch("http://localhost:3333/saveFavorites", {
        method: "POST",
        body: formData,
      })
        .then(processStatus)
        .then(parseJson);
    }

    // --- ACTION ---
    var sourceImageUrl = pictureUrl;
    console.log(
      'Started downloading image from <a href="' +
        sourceImageUrl +
        '">https://www.wikiart.org/ API'
    );

    downloadFile(sourceImageUrl) // download file from one resource
      .then(uploadImageToBackend); // upload it to another
    console.log("Image uploaded to Backend</a>");
  };

  const deleteFavorite = async (item) => {
    const pictureId = item.id;
    const url = "http://localhost:3333/deleteFavorites";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pictureId }),
    });
  };

  const [favorite, setFavorite] = React.useState(false);
  const favoriteHandler = () => {
    setFavorite(!favorite);
    token;
    favorite ? deleteFavorite(item) : saveFavorite(item);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ImageListItem id={styles.picturecard}>
        <div id={styles.container}>
          <img
            onClick={() => clickHandler(item)}
            src={`${item.image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            id={styles.topbar}
            position="top"
            actionIcon={
              !token ? (
                <IconButton
                  className="icon"
                  onClick={loginPopUp}
                  sx={{ color: "whitesmoke" }}
                  aria-label={`star ${item.title}`}
                >
                  <HeartBroken />
                </IconButton>
              ) : favorite ? (
                <IconButton
                  className="icon"
                  onClick={favoriteHandler}
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
        </div>
        <h2>{item.title}</h2>
        <h4>{item.artistName}</h4>
        <h5>{item.completitionYear}</h5>
      </ImageListItem>
    </StyledEngineProvider>
  );
};

export default GalleryCard;
