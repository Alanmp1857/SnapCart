import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: { username: '', email: '' } },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Update the entire user object
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
