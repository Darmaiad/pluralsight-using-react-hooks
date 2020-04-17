export default (state, action) => {
    const { type, data } = action;
    const updateFavorite = (favoriteValue) => state.map((item) => {
        if (item.id === data.sessionId) {
            item.favorite = favoriteValue;
            return item;
        }
        return item;
    });
    switch (type) {
    case 'setSpeakerList': {
        return data;
    }
    case 'favorite': {
        return updateFavorite(true);
    }
    case 'unfavorite': {
        return updateFavorite(false);
    }
    default: {
        return state;
    }
    }
};
