const selectAnime = (state = {}, action) => {
    switch (action.type) {
      case "SELECT_ANIME":
        console.log("Selected anime data in reducer:", action.payload);  // Check what data is being passed
        return { ...state, ...action.payload };
      
      default:
        return state;
    }
  };
  
  export default selectAnime;