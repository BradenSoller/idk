import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux'; 
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import "./Home.css";
import AddAnime from '../AddAnime/addAnime';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Button } from '@mui/material';

function HomePage() {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Animes = useSelector((store) => store.AllAnime) // store connects to reducers 
  const [title, setTitle] = useState('');
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_ANIME" });

    window.scrollTo(0, 0);
  }, []);

  const newAnime = (event) => {
    event.preventDefault();
  

    dispatch({
      type: "FETCH_NEW_ANIME", payload: {
        title: title
      }
    });
    setTitle('')
  
  }

  const StatusChange = (id) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: id,
    });
  };

  
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  
  return (

    <div className="container">
      <div>
        <div>
          <input type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <button className='submitAnime' onClick={newAnime}>submit</button>
        </div>
      </div>
      {Animes.map((anime) => {
        return (
          <div>
          <div className='animeCards'>
              <h3>{anime.title}</h3>
              <Button onClick={() => StatusChange(anime.id)}>
                      {anime.is_liked ? (
                          <StarOutlinedIcon className="star"></StarOutlinedIcon>
                    ) : (
                        <StarBorderOutlinedIcon className="star"></StarBorderOutlinedIcon>
                      )}
                 </Button>
              
            </div>

    
          </div>
        )
      } 
        
     
    
      )}
    </div>
  );
}

// <div>
//   {Animes.map((anime) => {
//     return (
//       <div className="AnimeDisplay" key={anime.id}>
//         <h1>{anime.title}</h1>
//         <Button onClick={() => StatusChange(anime.id)}>
//           {anime.is_liked ? (
//             <StarOutlinedIcon className="star"></StarOutlinedIcon>
//           ) : (
//             <StarBorderOutlinedIcon className="star"></StarBorderOutlinedIcon>
//           )}
//         </Button>
//       </div>

  //   )

  // })}

// this allows us to use <App /> in index.js
export default HomePage;
