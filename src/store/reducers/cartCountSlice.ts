import { createSlice } from '@reduxjs/toolkit';

const cartCountSlice = createSlice({
  name: 'cartCount',
  initialState: { cartClickCount: 0},
  reducers: {
    cartClick: (state) => {
        state.cartClickCount = state.cartClickCount + 1
    }
  },
});

export const { cartClick } = cartCountSlice.actions;
export default cartCountSlice.reducer;
