import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import Cookies from "js-cookie";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      ...data,
      qty,
    },
  });
  // need cookies instead of local storage because of ssr
  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  Cookies.set("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  Cookies.set("cartItems", JSON.stringify(getState().cart.cartItems));
};
