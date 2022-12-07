const getMostViewed = async () => {
  
    const response = await fetch('http://localhost:3333')
    // const response = await fetch('https://wikiartsproxyserver-hxvu2.ondigitalocean.app/')
    const mostViewedPaintings = await response.json()
 
    console.log(mostViewedPaintings);

  return mostViewedPaintings
};

export default getMostViewed;


