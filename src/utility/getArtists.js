const getArtists = async () => {
  

  const response = await fetch(`http://localhost:3333/artists`);
  // const response = await fetch(`https://wikiartsproxyserver-hxvu2.ondigitalocean.app/artists`);
  const artists = await response.json();
  
  console.log(artists);
  return artists
  };
  
  export default getArtists;