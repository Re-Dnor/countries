import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  search: '',
  region: '',
}

const controlsSlice = createSlice({
  name: '@@controls',
  initialState,
  reducers: {
    setSeacrh: (state, action) => {
      state.search = action.payload
    },
    setRegion: (state, action) => {
      state.region = action.payload
    },
    clearControls: () => initialState
  }
});

export const { setSeacrh, setRegion, clearControls } = controlsSlice.actions;
const controlsReducer = controlsSlice.reducer;
export default controlsReducer