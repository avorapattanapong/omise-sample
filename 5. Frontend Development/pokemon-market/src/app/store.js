import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../redux/slices/cards.js';
import cartReducer from '../redux/slices/cart.js';
import appReducer from '../redux/slices/app.js';

export const store = configureStore({
  reducer: {
    card: cardReducer,
    cart: cartReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable warning for thunk actions
    }),
});
