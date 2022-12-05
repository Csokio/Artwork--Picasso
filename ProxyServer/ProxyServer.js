const fetch = require("node-fetch");
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const { response } = require("express");
// const formData = require('form-data')
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const tokens = [
  "",
  "?paginationToken=iHUa6WAPF%2fzgSNu%2fzkfPRaS0MDRZMQk922gJj%2bOD2Jo%3d",
  "?paginationToken=c1U2tRfbCX6%2bw8uWtQLMBdvMFC2T7DhVnt9wZNMeN6c%3d",
  "?paginationToken=2kjyBuvG0YA8nozqk2%2fv%2fEjg2BzHbLG9FoCJEwejQvo%3d",
  "?paginationToken=XPfYaMIaDTulUxxv1RknC6SpZbMuKEomEyeaQVPBv50%3d",
  "?paginationToken=0qCIFw7RCBEpFCfIoHpY9ETClLwgeth4cttK3yHU2bU%3d",
  "?paginationToken=X5QBk5VgByogGiEVCwt7KW8quEBuNMAw0T95fvqL7kY%3d",
  "?paginationToken=0%2fckpFbE7Unweup%2blG5RBnhtM9m0HqCXjdWg1Gqi10E%3d",
  "?paginationToken=12hn47%2bE7G1zIngAaFaotD0mM%2fUdDhRImqrJn69OQFY%3d",
  "?paginationToken=NVtltkTYwgDoLP8Ofbi9fo3l72ob31ZQgBmcCSUIXdA%3d",
  "?paginationToken=Vr3Z9h%2bNS22S92DQdYyNFFWHVqaIidOYutlRzVG6Bwg%3d",
  "?paginationToken=YlmNgWxhfjZiDXBVde9Pi8mN3vktB99RSkiBEJSMz%2bU%3d",
  "?paginationToken=KWX66gQ35rkneW%2fbwq8w5hCXD2CEcOyE%2bWaSdNQMVn4%3d",
  "?paginationToken=vNcPbYPD5eCw%2fKkt11rnhSLLi9G5icx89LBfsv6k%2bdE%3d",
  "?paginationToken=bDSV8neWTO7YNw8Xa%2fbMqIpmw8LRuLESwoxHg6tBndg%3d",
  "?paginationToken=%2fUJ%2bq86qvIbGzDaNG8iVBKQ1IoWAM3s1EVObq%2fKlRS4%3d",
  "?paginationToken=i7xCq8v0ADAwoaMDJB39PfwY%2br3YcmEVRV1lmqtRcXU%3d",
  "?paginationToken=N86%2fykxls0YgiPoMdoyU5GC6Y1%2fRSXvx%2bpBYAtZF5ac%3d",
  "?paginationToken=C59N8s6rQmVbORAKRnk%2bA0Vi18vPMZpuUdvHMbjgHcU%3d",
  "?paginationToken=t9Z6rni%2bdwrSD1RzXK2XlUOcWH%2fBFFxdnJmvaTodvvE%3d",
  "?paginationToken=LhfyNsIIj1tOvXGni2Hwtm5E%2bP%2fBR%2bfL%2bvrN%2fNYdcOw%3d",
  "?paginationToken=lcGctq6M0WVpBCrmkYLFUBXXGhn9snWP0eKlP3FEdeQ%3d",
  "?paginationToken=NRGJA9qtkgycubalEJX9E9Rls5Lw8oLbLtxetNsfH68%3d",
  "?paginationToken=%2fEo5HEwqfK3L83DcD%2b63zQv0bhlfXnmfFqyGd6Up800%3d",
  "?paginationToken=%2fASIBFWmIUvC7A%2bKS3WRsx0hcaRAQQiOI0VHTDJUwjw%3d",
  "?paginationToken=VfrdhauCiwOEf2y%2f%2bh1zbuZc52eXVuybw8hxiN3H3T0%3d",
];

const getAllArtists = async () => {
  const data = fs.readFileSync("./data/artists.json");
  const artistJson = JSON.parse(data);
  for (const token of tokens) {
    let artistResponse = await fetch(
      `https://www.wikiart.org/en/api/2/UpdatedArtists${token}`
    );
    let artistResult = await artistResponse.json();
    console.log(artistResult.paginationToken);
    for (let i = 0; i < artistResult.data.length; i++) {
      artistJson.push(artistResult.data[i]);
    }
  }
  const newArtistData = JSON.stringify(artistJson);
  fs.writeFileSync("./data/artists.json", newArtistData);
};

// getAllArtists()

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
  const data = fs.readFileSync("./data/artists.json");
  const storedArtists = JSON.parse(data);
  res.json(storedArtists);
});

// function paginated_fetch(
//   url = 'https://www.wikiart.org/en/api/2/UpdatedArtists', // Improvised required argument in JS
//   page = "",
//   previousResponse = []
// ) {
//   return fetch(`${url}?paginationToken=${page}`) // Append the page number to the base URL
//     .then(response => response.json())
//     .then(newResponse => {
//       const response = [...previousResponse.data, ...newResponse.data]; // Combine the two arrays

//       if (newResponse.hasMore) {
//         page == newResponse.paginationToken

//         return paginated_fetch(url, page, response);
//       }

//       res.json(response)
//     });
// }
// paginated_fetch()

// const fetchAllPages = (url) => fetch (url)
//   .then (res => res .json ())
//   .then (
//     ({items, continuationToken: token}) => token
//       ? fetchAllPages (addToken (url, token)) .then (newItems => [...items, ...newItems])
//       : items
//   )

//   fetchAllPages('https://www.wikiart.org/en/api/2/UpdatedArtists?')

// async function fetchRequest(url) {
//   try {
//     // Fetch request and parse as JSON
//     const response = await fetch(url);
//     let data = await response.json();
//     console.log(data)
//     // Extract the url of the response's "next" relational Link header
//     let next_page;
//     if( data.hasMore)
//         next_page = `https://www.wikiart.org/en/api/2/UpdatedArtists?paginationToken=${data.paginationToken}`;

//     // If another page exists, merge it into the array
//     // Else return the complete array of paginated output
//     if (data.hasMore) {
//       let temp_data = await fetchRequest(next_page);
//       data = data.data.concat(temp_data);
//     }

//     res.json(data);
//   } catch (err) {
//     return console.error(err);
//   }
// }

// fetchRequest(`https://www.wikiart.org/en/api/2/UpdatedArtists`)

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
  const getPbSearch = async () => {
    paintingsBySearch = await fetch(
      `https://www.wikiart.org/en/api/2/PaintingSearch?term=${searchTerm}&imageFormat=HD`
    );
    let paintings = await paintingsBySearch.json();
    res.json(paintings);
  };

  getPbSearch();
});

// FOR PRESENTATION ONLY

app.post("/saveFavorites", (req, res) => {
  const data = fs.readFileSync("./demo/favorites.json");
  const favoriteJson = JSON.parse(data);
  const title = req.body.title;
  const artist = req.body.artist;
  const year = req.body.year;
  const artistId = req.body.artistId;
  const pictureId = req.body.pictureId;
  const newFavorite = {
    id: pictureId,
    title: title,
    artist: artist,
    year: year,
    artistId: artistId,
  };
  favoriteJson.push(newFavorite);
  const newFavoriteData = JSON.stringify(favoriteJson);
  fs.writeFileSync("./demo/favorites.json", newFavoriteData);


const image = req.files.image
image.mv('./demo/images/' + pictureId + '.jpg')
  res.sendStatus(200);
});

app.post("/deleteFavorites", (req, res) => {
  const data = fs.readFileSync("./demo/favorites.json");
  const favoriteJson = JSON.parse(data);

  const id = req.body.pictureId
console.log(id);
  let newDelete = favoriteJson.filter((image) => image.id !== id);
  let newData = JSON.stringify(newDelete);
  fs.writeFileSync("./demo/favorites.json", newData);

  const pictureUploadPath = `./demo/images/${id}.jpg`;
console.log(pictureUploadPath)

if (fs.existsSync(pictureUploadPath)) {
  fs.unlinkSync(pictureUploadPath, (err) => {
    if (err) {
      console.log(err);
       res.status(500).send(err);
    }
  })

  res.sendStatus(200)
}});

app.listen(3333, () => {
  console.log(`Megy az proxyServer a 3333-es porton`);
});
