import {useDispatch, useSelector} from "react-redux";
import {toggleCartDrawer} from "../slices/app.js";

const useApp = () => {
  const dispatch = useDispatch();
  const { isCartDrawerOpen } = useSelector((state) => state.app);

  const openCartDrawer = () => {
    dispatch(toggleCartDrawer(true));
  };

  const closeCartDrawer = () => {
    dispatch(toggleCartDrawer(false));
  }

  return {
    isCartDrawerOpen,
    toggleCartDrawer,
    openCartDrawer,
    closeCartDrawer
  };
}

export default useApp;
