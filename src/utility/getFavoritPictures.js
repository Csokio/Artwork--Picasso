const getFavouritePictures = async (token) => {
  
  const response = await fetch('http://valami:8080/api/artwork',{
    method: 'GET',
    headers:{    
      authorization: `bearer ${token}`},
  })
  const FavouritePictures = await response.json()

return FavouritePictures
};

export default getFavouritePictures;


