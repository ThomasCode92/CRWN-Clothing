import { createSelector } from "reselect";

const newCartCount = newCartItems.reduce((total, item) => {
  return total + item.quantity;
}, 0);

const newCartTotal = newCartItems.reduce((total, item) => {
  return total + item.quantity * item.price;
}, 0);