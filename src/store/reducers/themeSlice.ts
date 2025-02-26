import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'light', backgroundColor: 'white' },
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark';
        state.backgroundColor = '#191919';
      } else {
        state.theme = 'light';
        state.backgroundColor = ' ';
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
