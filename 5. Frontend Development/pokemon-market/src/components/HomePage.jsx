import CardGrid from '../components/CardGrid';
import CartSidebar from '../components/CartSidebar';
import usePokemonCards from "../redux/hooks/pokemon.js";
import Filters from "./Filters.jsx";
import PaginationBar from "./PaginationBar.jsx";

function HomePage() {
  const {
    cards,
    loading,
    page,
    filters,
    availableRarities,
    availableTypes,
    updateFilters,
    updatePage,
    doFetchCards,
    totalCardsFromSearchResults
  } = usePokemonCards();

  return (
    <>
      <Filters
        filters={filters}
        setFilters={updateFilters}
        onBlur={doFetchCards}
        types={availableTypes}
        rarities={availableRarities}
      />
      <CardGrid
        cards={cards}
      />
      <PaginationBar
        currentPage={page}
        totalCards={totalCardsFromSearchResults}
        onPageChange={updatePage}
      />
      <CartSidebar />
    </>
  );
}

export default HomePage;
