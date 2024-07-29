const newAnime = (state = [], action) => {

    switch (action.type) {
        case 'NEW_ANIME':
            return action.payload
        default:
            return state;
    }
}

export default newAnime