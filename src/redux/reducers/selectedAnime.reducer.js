const selectAnime = (state = {}, action) => {
    if (action.type === "SELECT_ANIME") {
  
      return action.payload;
    }
    return state;
  };
  
  export default selectAnime;