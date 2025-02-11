import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressProps, UserProps } from "../../models/UserProps.interface";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      username: "",
      email: "",
      address: [
        {
          city: "",
          zipCode: "",
          mobile: "",
          state: "",
        },
      ],
      password: "",
      wallet:0,
    },
  },
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserProps>>) => {
      state.user = { ...state.user, ...action.payload }; // Merge updates instead of replacing
    },

    updateAddress: (state, action: PayloadAction<AddressProps>) => {
      // Assuming we're updating the first address, you can handle it based on the index if needed
      state.user.address[0] = { ...state.user.address[0], ...action.payload };
    },
  },
});

export const { setUser, updateAddress } = userSlice.actions;
export default userSlice.reducer;
