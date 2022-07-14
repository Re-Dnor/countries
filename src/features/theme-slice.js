import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
  name: '@@theme',
  initialState: 'light',
  reducers: {
    setTheme: (state, action) => {
      return action.payload;
    }
  }
});

export const { setTheme } = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer