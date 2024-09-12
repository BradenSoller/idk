import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddAnime from "../AddAnime/addAnime";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./infoPage.css"
// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Animes = useSelector((store) => store.AllAnime);
console.log(Animes);
  const StatusChange = (id) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: id,
    });
  };
  return (
    
    <div className="container">
      <div className="favoriteCard">
      {Animes.map((anime) => {
        return (
          <div>
            {anime.is_liked &&
              <div className="animeCards">
            
                <h3>{anime.title}</h3>
                <Button onClick={() => StatusChange(anime.id)}>
                  {anime.is_liked ? (
                    <StarOutlinedIcon className="star"></StarOutlinedIcon>
                  ) : (
                    <StarBorderOutlinedIcon className="OutlinedStar"></StarBorderOutlinedIcon>
                  )}
                </Button>
            
              </div>
            }
          </div>
        );
      })}
      
    </div> 
    </div>
    
  );
}

export default InfoPage;
