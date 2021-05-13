const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} = require("../constants/cartConstants");

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const itemToAdd = action.payload;

      const itemAlreadyExistsInCart = state?.cartItems?.find(
        (cartItem) => cartItem._id === itemToAdd._id
      );

      if (itemAlreadyExistsInCart) {
        return {
          ...state,
          cartItems: state?.cartItems?.map((cartItem) =>
            cartItem._id === itemAlreadyExistsInCart._id ? itemToAdd : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state?.cartItems, itemToAdd],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
