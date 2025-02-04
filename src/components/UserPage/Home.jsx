import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux'; 
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import "./Home.css";

import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};


function HomePage() {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  const Animes = useSelector((store) => store.AllAnime)
  console.log("all animes",Animes);  
  const singleAnime = useSelector((store) => store.selectAnime);
  console.log("singleAnime", singleAnime);
  

  const [title, setTitle] = useState('');
  let [imageInput, setImageInput] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {

    dispatch({ type: "FETCH_ALL_ANIME" });
    FetchSingleAnime;
   

    window.scrollTo(0, 0);
  }, []);



  const history = useHistory()
  
  const eventForm = new FormData();


  const newAnime = (event) => {
    event.preventDefault();

    eventForm.append("image", imageInput);
    eventForm.append("title", title);


    dispatch({
      type: "FETCH_NEW_ANIME",
      payload: eventForm
      }
    );
    setTitle('')
    setImageInput('')

  
  }

  const StatusChange = (id) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: id,
    });
   
  };

  const deleteAnime = (anime) => {
    dispatch({
      type: "DELETE_ANIME",
      payload: anime,
    });
  };

  const FetchSingleAnime = (id) => {
    console.log("payload",id);
    dispatch({
      type: "FETCH_SELECTED_ANIME",
      payload:{id}
    });
  };
  
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  
  return (
    

    <div className="container">

      <div>
        <div>
          <input className='inputAnime' type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <input
            id="event-image-input"
            type="file"
            onChange={(e) => setImageInput(e.target.files[0])}
            sx={{
              width: 230,
            }}
          />
        </div>
        <div>
          <button className='submitAnime' onClick={newAnime}>submit</button>
        </div>
      </div>
      <div className='backroundCard'>
        
     {Animes.map((anime) => {
       return (
         
         <div  className="animeCards"key={anime.id} onClick={() => FetchSingleAnime(anime.id)}>
            <img className='cardImage' src={anime.image}></img>
            <h3 className='cardText'> {anime.title}</h3>
        
              <Button onClick={() => StatusChange(anime.id)}>
                      {anime.is_liked ? (
                          <StarOutlinedIcon className="star"></StarOutlinedIcon>
                    ) : (
                        <StarBorderOutlinedIcon className="OutlinedStar"></StarBorderOutlinedIcon>
                      )}
            </Button>
            <Button className='deleteAnime' onClick={() => deleteAnime(anime)}>
              <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
            </Button>
            </div>
     )} 

        
     
    
        )}
        {/* <div className='ModalHome'>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <div>
                {singleAnime.map((anime) => {

                  return (
                
                  
            
        
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {anime.title}
              </Typography>
              
                )})}
            </div>
            </Box>
    
          </Modal>
        </div> */}
      </div>
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
