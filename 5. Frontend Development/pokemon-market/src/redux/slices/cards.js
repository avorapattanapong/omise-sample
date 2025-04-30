import { createSlice } from '@reduxjs/toolkit';
import {fetchCards, fetchRarities, fetchTypes} from "../thunks/cards.js";

const initialState = {
  cards: [],
  loading: false,
  error: null,
  page: 1,
  filters: {
    name: '',
    type: '',
    rarity: '',
    set: '',
  },
  availableTypes: [],
  availableRarities: [],
  totalCardsFromSearchResults: 0
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCards.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCards.fulfilled, (state, action) => {
      state.loading = false;
      state.cards = action.payload.data;
      state.totalCardsFromSearchResults = action.payload.totalCount;
    })
    .addCase(fetchCards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(fetchRarities.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRarities.fulfilled, (state, action) => {
      state.loading = false;
      state.availableRarities = action.payload;
    })
    .addCase(fetchRarities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(fetchTypes.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.availableTypes = action.payload;
    })
    .addCase(fetchTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setPage, setFilters } = cardSlice.actions;
export default cardSlice.reducer;
