import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchPokemonCards,
  fetchPokemonRarities,
  fetchPokemonTypes
} from '../../api/pokemonApi';

export const fetchCards = createAsyncThunk(
  'pokemon/fetchCards',
  async (params, thunkAPI) => {
    try {
      return await fetchPokemonCards(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRarities = createAsyncThunk(
  'pokemon/fetchRarities',
  async (_, thunkAPI) => {
    try {
      return await fetchPokemonRarities();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTypes = createAsyncThunk(
  'pokemon/fetchTypes',
  async (_, thunkAPI) => {
    try {
      return await fetchPokemonTypes();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
