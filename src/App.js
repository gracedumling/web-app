// ... (your existing imports)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepForward, faStepBackward, } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import "./App.css";
import Songtitles from "./components/Songtitle";
import Moodbuttons from "./components/buttons";
import Songs from "./SongDatabase/Music";
import Header from "./components/Header";
function App() {
  const [songUrl, setsongUrl] = useState("");
  const [songName, setsongName] = useState("...");
  const [mood, setmood] = useState("");
  const [toggleMode, settoggleMode] = useState(false);
  const [searchVal, setsearchVal] = useState("");
  const [playerthumbnail, setplayerthumbnail] = useState("");
  const DarkmodeClass = ["fatherContainer"];
  const NonDarkModeClass = ["whiteBg"];
  const playSong = (songSource, songTitle, playerThumbnail) => {
    setsongName(songTitle);
    setsongUrl(songSource);
    setplayerthumbnail(playerThumbnail);
  };

  const toggle = () => {
    settoggleMode(!toggleMode);
  };

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % Songs.length;
    setCurrentSongIndex(nextIndex);
    playSong(Songs[nextIndex].Source, Songs[nextIndex].Title, Songs[nextIndex].Thumbnail);
  };

  const playPreviousSong = () => {
    const previousIndex = (currentSongIndex - 1 + Songs.length) % Songs.length;
    setCurrentSongIndex(previousIndex);
    playSong(Songs[previousIndex].Source, Songs[previousIndex].Title, Songs[previousIndex].Thumbnail);
    
  };
  /*const playPause = () => {
    // Implement play/pause functionality here
    // You may need to manage play/pause state
  };*/


  return (
    <div
      className={
        toggleMode ? DarkmodeClass.join(" ") : NonDarkModeClass.join("")
      }
    >
      <Header toggleMode={toggleMode} />
      <div className="audioElement">
        <div class="player">
          <img
            onClick={toggle}
            className="playerThumbnail"
            src={playerthumbnail || "/songplayer/Assets/playerDisc.png"}
            alt={songName}
          ></img>

          <div class="nameplayer">
            <p style={toggleMode ? {color: "#ffffff"} : { color: "#000000" }}>{songName}</p>
            <audio controls autoPlay={true} loop={true} src={songUrl}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
            <div class="icon">
           
            <button onClick={playPreviousSong} style={{ marginRight: '20px', width: '25px', height: '25px' }}>
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button onClick={playNextSong} style={{width: '25px', height: '25px' }}>
          <FontAwesomeIcon icon={faStepForward} />
        </button>
     
            </div>
          </div>
        </div>
      </div>

      <div className="tileContainer">
        {Songs.map((song) => {
          return (
            <Songtitles
              key={song.SongID}
              thumbnail={song.Thumbnail}
              source={song.Source}
              title={song.Title}
              category={song.Category}
              toggleMode={toggleMode}
              playFunction={playSong}
            />
          );
        })}
      </div>
      <hr></hr>
      <Moodbuttons setmood={setmood} toggleMode={toggleMode} />

      <div className={toggleMode ? "searchBar" : "darkSearchBar"}>
        <input
          placeholder="Search your song.."
          value={searchVal}
          onChange={(e) => {
            setsearchVal(e.target.value);
          }}
        ></input>
      </div>
      <div className="listTileHolder">
        {!searchVal
          ? Songs.filter((song) => song.Category.includes(mood)).map(
              (item, index) => (
                <li
                  onClick={() =>
                    playSong(item.Source, item.Title, item.Thumbnail)
                  }
                  className="listTiles"
                >
                  {index + 1}. {item.Title} | {item.Category.toUpperCase()}
                </li>
              )
            )
          : Songs.filter((song) =>
              song.Title.toUpperCase().includes(searchVal.toUpperCase())
            ).map((item, index) => (
              <li
                onClick={() =>
                  playSong(item.Source, item.Title, item.Thumbnail)
                }
                className="listTiles"
              >
                {index + 1}. {item.Title} |{item.Category.toUpperCase()}
              </li>
            ))}
      </div>
      <div className="footer">
       
        <h5>Switch Mode</h5>
        <input type="checkbox" onClick={toggle}></input>
        
       
      </div>
    </div>
  );
}

export default App;