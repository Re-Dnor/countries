import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  status: 'idle', //loading || received || rejected
  error: null,
  list: [],
}

export const loadCountries = createAsyncThunk(
  '@@countries/load-countries',
  (_,
    { extra: { client, api }
    }) => {
    return client.get(api.ALL_COUNTRIES)
  })

const countriesSlice = createSlice({
  name: '@@countries',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        status: 'loading',
        error: null,
      }
    },
    setCountries: (state, action) => {
      return {
        ...state,
        status: 'received',
        list: action.payload
      }
    },
    setError: (state, action) => {
      return {
        ...state,
        status: 'rejected',
        error: action.payload,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      })
  }
});

export const { setCountries, setError, setLoading } = countriesSlice.actions;
const countriesReducer = countriesSlice.reducer;
export default countriesReducer;