import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux'; 
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';


function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const Animes = useSelector ((store) => store.AllAnime) // store connects to reducers 

  return (
    <div className="container">
  
    </div>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
