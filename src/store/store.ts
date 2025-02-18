import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import themeReducer from './reducers/themeSlice';
import cartCountReducer from './reducers/cartCountSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    cartCount: cartCountReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;