import { useEffect, useState } from "react";
import "./App.css";
import getData from "./utility/getData";
import getArtists from "./utility/getArtists";
import Gallery from "./components/Gallery.jsx";
import Menubar from "./components/Menubar.jsx";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [data, setData] = useState([]);
  const [artists, setArtists] = useState(null);
  const [isOn, setIsOn] = useState(false);
  // const [tags, setTags] = useState();

  console.log(data);

  useEffect(() => {
    const init = async () => {
      setData(await getData());
      setArtists(await getArtists());
    };
    init();
  }, []);

  const getArtsByPainterId = async (id) => {
    setIsOn(!isOn);
   
    const url = "http://localhost:3333/pba";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
    
    const artistPaintings = await response.json();
    setData(artistPaintings.data);
    setIsOn(false);
  };

  const getArtsByKeyWord = async (term) => {
    setIsOn(!isOn);
    const url = "http://localhost:3333/pbsearch";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({term}),
    });
    
    const searchTerm = await response.json();
    setData(searchTerm.data);
    setIsOn(false);
  };

  return (
    <>
      <Menubar
        onChange={getArtsByPainterId}
        onInput={getArtsByKeyWord}
        artists={artists === null ? [] : artists}
      />
      {data.length === 0 || isOn ? (
        <div id="loading">
          <CircularProgress size={170} />
        </div>
      ) : (
        <Gallery data={data} />
      )}
    </>
  );
}

export default App;
