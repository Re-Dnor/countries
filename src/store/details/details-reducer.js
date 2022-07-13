const initalState = {
  currentCountry: null,
  status: 'idle',
  error: null,
  neighbors: [],
}

const detailsReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        status: 'loading',
        error: null,
      }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        status: 'rejected',
        error: action.payload,
      }
    }
    case 'SET_COUNTRY': {
      return {
        ...state,
        status: 'received',
        error: null,
        currentCountry: action.payload,
      }
    }
    case 'SET_NEIGHBORS': {
      return {
        ...state,
        neighbors: action.payload
      }
    }
    case 'CLEAR_DETAILS': {
      return initalState;
    }
    default: {
      return state;
    }
  }
}

export default detailsReducer;