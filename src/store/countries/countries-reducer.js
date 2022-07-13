const initialState = {
  status: 'idle', //loading || received || rejected
  error: null,
  list: []
}

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        status: 'loading',
        error: null,
      }
    }
    case 'SET_COUNTRIES': {
      return {
        ...state,
        status: 'received',
        list: action.payload
      }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        status: 'rejected',
        error: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}

export default countriesReducer;