const initalState = {
  search: '',
  region: '',
}

const controlsReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SET_SEARCH': {
      return {
        ...state,
        search: action.payload
      }
    }
    case 'SET_REGION': {
      return {
        ...state,
        region: action.payload
      }
    }
    case 'CLEAR': {
      return initalState;
    }
    default: {
      return state;
    }
  }
}

export default controlsReducer;