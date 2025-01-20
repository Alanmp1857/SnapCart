import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'light', backgroundColor: '#E3DDFF' },
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark';
        state.backgroundColor = '#2D2638';
      } else {
        state.theme = 'light';
        state.backgroundColor = '#E3DDFF';
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
