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
  try {
      const response = yield axios({
          method: 'POST',
          url: '/api/anime',
          data: action.payload
      })
      yield getAllAnime()
  }
  catch (error) {
      console.error('Shelf POST failed:', error)
  }
}

 export default function* AnimeSaga() { 
   yield takeLatest("FETCH_ALL_ANIME", getAllAnime),
   yield takeLatest("FETCH_NEW_ANIME", postAnime)
  }
