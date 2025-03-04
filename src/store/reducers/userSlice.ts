import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddressProps,
  OrderProps,
  UserProps,
} from "../../models/UserProps.interface";

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
    orders: [],
    cart: [],
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

    addOrders: (state, action: PayloadAction<OrderProps[]>) => {
      state.user.orders.push(action.payload);
    },

    addCart: (state, action: PayloadAction<OrderProps>) => {
      const existingItem = state.user.cart.find(
        (item) => item.productId === action.payload.productId
      );
    
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; // Increment quantity
      } else {
        state.user.cart.push(action.payload);
      }
    },    

    removeCart: (state, action: PayloadAction<string>) => {
      state.user.cart = state.user.cart
        .map((item) =>
          item.productId === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    },

    removeAllCart: (state) => {
      state.user.cart = [];
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

    // toggleFavourite: (state, action: PayloadAction<string>) => {
    //   if (state.user.favourites.includes(action.payload)) {
    //     state.user.favourites = state.user.favourites.filter(
    //       (item) => item !== action.payload
    //     );
    //   } else {
    //     state.user.favourites.push(action.payload);
    //   }
    // },

    toggleFavourite: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state.user.favourites.includes(productId)) {
        state.user.favourites = state.user.favourites.filter(
          (id) => id !== productId
        );
      } else {
        state.user.favourites = [...state.user.favourites, productId]; // Ensure immutability
      }
    },
  },
});

export const {
  setUser,
  updateAddress,
  addOrders,
  addFavourite,
  addCart,
  removeCart,
  removeAllCart,
  removeFavourite,
  toggleFavourite,
} = userSlice.actions;
export default userSlice.reducer;
