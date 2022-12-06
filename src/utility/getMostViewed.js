const getMostViewed = async () => {
  
    const response = await fetch('http://localhost:3333')
    const mostViewedPaintings = await response.json()
 
    console.log(mostViewedPaintings);

  return mostViewedPaintings
};

export default getMostViewed;


