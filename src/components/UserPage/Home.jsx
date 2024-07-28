import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux'; 
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import "./Home.css";
import AddAnime from '../AddAnime/addAnime';


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
      type: "SAGA/POST_ANIME", payload: {
        title: title
      }
    });
    setTitle('')
  }
  
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  
  return (

    <div className="container">
      <div>
        <div>
          <input type="text"
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
            </div>
          </div>

             

        )
      } 
     
    
      )}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
