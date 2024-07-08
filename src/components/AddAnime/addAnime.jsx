import { useState, useEffect, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import './ScheduleForm.css';
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddAnime() {
    const [animeTitle, SetAnimeTitle] = useState('')


    const newAnime = (event) => {
        event.preventDefault();

        dispatch({
            type: "SAGA/POST_ANIME", payload: {
                title: title
            }
        });
        setTitle('')

    };
}