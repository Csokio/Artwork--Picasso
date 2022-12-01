const fetch = require('node-fetch')
const getData = async () => {
    let response = await fetch(
      `https://www.wikiart.org/en/api/2/PaintingSearch?term=Picasso&authSessionKey=71c274e585d9`
    );
    let result = await response.json();
    
    console.log(result);
    return result;  
  };

  getData()