const getData = async () => {
  
    const response = await fetch('http://localhost:3333')
    const mostViewedPaintings = await response.json()
 
  return mostViewedPaintings
};

export default getData;


