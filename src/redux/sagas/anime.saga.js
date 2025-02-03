import { put, take, takeLatest } from "redux-saga/effects";
import axios from "axios";

 function* getAllAnime() {
        try {
          const response = yield axios({
            method: "GET",
            url: "/api/anime/anime",
          });
          yield put({
            type: "SET_ANIME",
            payload: response.data,
          });
        } catch (error) {
          console.log("Unable to get pending events from server", error);
        }

 }

function* postAnime(action) {
  console.log("boo", action.payload);
  try {
    const headers = {
      "content-type": "multipart/form-data",
    };
    const response = yield axios({
      method: "POST",
      url: "/api/anime",
      headers: headers,
      data: action.payload,
    });
    yield put({
      type: "FETCH_ALL_ANIME",
    });
  }
  catch (error) {
      console.error('Shelf POST failed:', error)
  }
}

function* StatusChange(action) {
  try {
    const editedStatus = action.payload;

    const response = yield axios({
      method: "PUT",
      url: `/api/anime/status/${editedStatus}`,
    });

    yield put({
      type: "FETCH_ALL_ANIME",
    });
  } catch (err) {
    console.log("submitStatusChange failed.", err);
  }
}

function* deleteAnime(action) {
  try {
    const response = yield axios({
      method: "DELETE",
      url: `/api/anime/${action.payload.id}`,
      data: action.payload,
    });
    yield put({
      type: "FETCH_ALL_ANIME",
    });
  } catch (error) {
    console.log("Unable to delete tag", error);
  }
}

function* SelectedAnime(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/anime/${action.payload.id}`,
    });
    yield put({
      type: "SELECT_ANIME",
      payload: response.data,
    });
  } catch (error) {
    console.log("Unable to get events from server", error);
  }
}

 export default function* AnimeSaga() { 
   yield takeLatest("FETCH_ALL_ANIME", getAllAnime),
     yield takeLatest("FETCH_NEW_ANIME", postAnime),
     yield takeLatest("CHANGE_STATUS", StatusChange),
     yield takeLatest("DELETE_ANIME", deleteAnime),
     yield takeLatest("SELECT_ANIME", SelectedAnime)

   
  
  }


//   try {
//     const response = yield axios({
//         method: 'POST',
//         url: '/api/anime',
//         data: action.payload
//     })
//     yield getAllAnime()
// }