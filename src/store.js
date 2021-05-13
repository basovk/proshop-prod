const Cookies = require("js-cookie");
const { createStore, combineReducers, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;
const { composeWithDevTools } = require("redux-devtools-extension");
const {
  productListReducer,
  productDetailsReducer,
} = require("./reducers/productReducers.js");
const { cartReducer } = require("./reducers/cartReducers.js");
const {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} = require("./reducers/userReducers.js");

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

// need cookies instead of local storage because of ssr
// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

const cartItemsFromStorage = Cookies.get("cartItems")
  ? JSON.parse(Cookies.get("cartItems"))
  : [];

const userInfoFromStorage = Cookies.get("userInfo")
  ? JSON.parse(Cookies.get("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
