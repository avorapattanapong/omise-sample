import pokemon from 'pokemontcgsdk'
import {PAGE_SIZE} from "../app/constants.js";

// API key is optional, we can add this later once we figure out how to securely store api keys

/**
 * Fetch a list of Pokemon cards
 * @param {Object} options { page, pageSize, filters }
 */
export const fetchPokemonCards = async ({ page = 1, pageSize = PAGE_SIZE, filters = {} }) => {
  const params = {
    page,
    pageSize,
  };

  if (filters) {
    const query = buildQuery(filters);
    if (query) {
      params.q = query;
    }
  }
  return await pokemon.card.where(params);
};

/**
 * Fetch a list of Pokemon types (aka SuperTypes)
 */
export const fetchPokemonTypes = async () => {
  return await pokemon.type.all();
}

/**
 * Fetch a list of rarity options
 */
export const fetchPokemonRarities = async () => {
  return await pokemon.rarity.all();
}

/**
 * Helper: Build query string based on filters
 */
function buildQuery(filters) {
  const queries = [];

  // It is possible to search by subtypes but for the first version we will not support this
  if (filters.name) queries.push(`name:"${filters.name}"`);
  if (filters.type) queries.push(`types:"${filters.type}"`);
  if (filters.rarity) queries.push(`rarity:"${filters.rarity}"`);
  if (filters.set) queries.push(`set.name:"${filters.set}"`);

  return queries.join(' AND ');
}
