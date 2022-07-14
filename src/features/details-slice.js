import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/";

export const loadCountryByName = createAsyncThunk(
  '@@details/load-by-name', (name, { extra: { api, client } }) => {
    return client.get(api.searchByCountry(name))
  }
)

export const loadNeighbors = createAsyncThunk(
  '@@details/neighbors', (borders, { extra: { api, client } }) => {
    return client.get(api.filterByCode(borders))
  }
)

const initialState = {
  currentCountry: null,
  status: 'idle',
  error: null,
  neighbors: [],
};

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadNeighbors.fulfilled, (state, action) => {
        state.neighbors = action.payload.data.map((neig) => neig.name)
      })
  }
});

export const { clearDetails } = detailsSlice.actions;
const detailsReducer = detailsSlice.reducer;
export default detailsReducer;