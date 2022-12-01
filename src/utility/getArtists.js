const getArtists = async () => {
  

const response = await fetch(
  `http://localhost:3333/artists`
);
const artist = await response.json();


return artist[0]
};

export default getArtists;
