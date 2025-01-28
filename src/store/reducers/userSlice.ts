import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      username: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      mobile: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Merge updates instead of replacing
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
