import {useDispatch, useSelector} from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity
} from "../slices/cart.js";

const useCart = () => {
  const {
    items
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCardToCart = (item) => {
    dispatch(addToCart(item));
  };

  const removeCardFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  const updateCardQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeCardFromCart(itemId);
      return;
    }
    dispatch(updateQuantity({ id: itemId, quantity }));
  };

  return {
    cartItems: items,
    addCardToCart,
    removeCardFromCart,
    emptyCart,
    updateCardQuantity
  };
}

export default useCart;
