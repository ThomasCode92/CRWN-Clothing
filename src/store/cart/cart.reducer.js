import { createSlice } from '@reduxjs/toolkit';

import {
  addCartItem,
  clearCartItem,
  removeCartItem,
} from '../../utils/cart/cart.util';

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    setCartIsOpen(state, action) {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  setCartIsOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
