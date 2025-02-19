import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressProps, UserProps } from "../../models/UserProps.interface";

// Define the initial state explicitly with the correct type
interface UserState {
  user: UserProps;
}

const initialState: UserState = {
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
    wallet: 0,
    favourites: [], // Explicitly typed
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserProps>>) => {
      state.user = { ...state.user, ...action.payload };
    },

    updateAddress: (state, action: PayloadAction<AddressProps>) => {
      // Updating the first address in the array
      state.user.address[0] = { ...state.user.address[0], ...action.payload };
    },

    addFavourite: (state, action: PayloadAction<string>) => {
      if (!state.user.favourites.includes(action.payload)) {
        state.user.favourites.push(action.payload);
      }
    },

    removeFavourite: (state, action: PayloadAction<string>) => {
      state.user.favourites = state.user.favourites.filter(
        (item) => item !== action.payload
      );
    },

    toggleFavourite: (state, action: PayloadAction<string>) => {
      if (state.user.favourites.includes(action.payload)) {
        state.user.favourites = state.user.favourites.filter(
          (item) => item !== action.payload
        );
      } else {
        state.user.favourites.push(action.payload);
      }
    },
  },
});

export const {
  setUser,
  updateAddress,
  addFavourite,
  removeFavourite,
  toggleFavourite,
} = userSlice.actions;
export default userSlice.reducer;
