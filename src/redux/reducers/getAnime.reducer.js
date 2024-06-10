const AllAnime = (state = [], action) => {
    switch (action.type) {
      case "SET_ANIME":
        return action.payload;
      default:
        return state;
    }
};
  
export default AllAnime