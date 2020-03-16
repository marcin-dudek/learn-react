const updateFavorite = (speakerList, id, favoriteValue) => {
  return speakerList.map(item => {
    if (item.id === id) {
      item.favorite = favoriteValue;
      return item;
    }
    return item;
  });
};

const speakerReducer = (state, action) => {
  switch (action.type) {
    case "setSpeakerList": {
      return action.data;
    }
    case "favorite": {
      return updateFavorite(state, action.sessionId, true);
    }
    case "unfavorite": {
      return updateFavorite(state, action.sessionId, false);
    }
    default:
      return state;
  }
};

export default speakerReducer;
