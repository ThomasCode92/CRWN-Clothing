export const addCartItem = (cartItems, item) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...item, quantity: 1 }];
};

export const removeCartItem = (cartItems, item) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== item.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCartItem = (cartItems, item) => {
  return cartItems.filter(cartItem => cartItem.id !== item.id);
};
