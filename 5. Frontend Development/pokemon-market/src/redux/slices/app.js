import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartDrawerOpen: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleCartDrawer: (state, action) => {
      state.isCartDrawerOpen = action.payload;
    },
  },
});

export const { toggleCartDrawer } = appSlice.actions;
export default appSlice.reducer;
