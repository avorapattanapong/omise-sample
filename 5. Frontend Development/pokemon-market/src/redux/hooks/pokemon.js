import { useDispatch, useSelector } from 'react-redux';
import {fetchCards, fetchRarities, fetchTypes} from '../thunks/cards.js'
import { setFilters, setPage } from '../slices/cards.js';
import { useEffect } from 'react';

const usePokemonCards= () => {
  const dispatch = useDispatch();
  const {
    cards,
    page,
    filters,
    loading,
    availableRarities,
    availableTypes,
    error,
    totalCardsFromSearchResults
  } = useSelector(state => state.card);

  useEffect(() => {
    dispatch(fetchCards(filters));
    dispatch(fetchRarities());
    dispatch(fetchTypes());
  }, []);

  const updateFilters = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(setPage(1)); // reset page on new filter
  };

  const doFetchCards = () => {
    dispatch(fetchCards({filters}));
  };

  const updatePage = (page) => {
    dispatch(setPage(page));
    dispatch(fetchCards({filters, page}));
  }

  return {
    cards,
    loading,
    page,
    filters,
    availableRarities,
    availableTypes,
    updateFilters,
    updatePage,
    error,
    totalCardsFromSearchResults,
    doFetchCards
  };
}

export  default usePokemonCards;
