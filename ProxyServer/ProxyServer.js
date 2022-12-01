const fetch = require("node-fetch");
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const { response } = require("express");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const getData = async () => {
    let response = await fetch(
      "https://www.wikiart.org/en/api/2/MostViewedPaintings?&imageFormat=HD"
    );
    let result = await response.json();

    const finalResult = result.data.filter((item) => item.image !== "");
    res.json(finalResult);
  };

  getData();
});

app.get("/artists", (req, res) => {
  const getArtists = async (token) => {
    let artistResponse = null;
    if (token !== undefined) {
      artistResponse = await fetch(
        `https://www.wikiart.org/en/api/2/UpdatedArtists?paginationToken=${token}`
      );
    } else {
      artistResponse = await fetch(
        `https://www.wikiart.org/en/api/2/UpdatedArtists`
      );
    }

    let artistResult = await artistResponse.json();

    let artistArray = [];
    artistArray.push(artistResult.data);
    res.json(artistArray);
  };

  getArtists();
});

app.post("/pba", (req, res) => {
  const id = req.body.id;
  const getPainting = async () => {
    artistResponse = await fetch(
      `https://www.wikiart.org/en/api/2/PaintingsByArtist?id=${id}&imageFormat=HD`
    );
    let artistResult = await artistResponse.json();
    res.json(artistResult);
  };

  getPainting();
});

app.post("/pbsearch", (req, res) => {
  

  const searchTerm = req.body.term;
  console.log(searchTerm);
  const getPbSearch = async () => {
    paintingsBySearch = await fetch(
      `https://www.wikiart.org/en/api/2/PaintingSearch?term=${searchTerm}&imageFormat=HD`
    );
    let paintings = await paintingsBySearch.json();
    res.json(paintings);
  };

  getPbSearch();
});

app.listen(3333, () => {
  console.log(`Megy az proxyServer a 3333-es porton`);
});
