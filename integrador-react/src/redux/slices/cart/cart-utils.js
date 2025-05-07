export const addItemToCart = (cartItems, product) => {
  const productInCart = cartItems.find((item) => item.id === product.id);

  if (productInCart) {
    return cartItems.map((item) => {
      item.id === productInCart
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, product) => {
  const productToRemove = cart.find((item) => item.id === product.id);

  if (productToRemove.quantity > 1) {
    return cartItems.map((item) =>
      item.id === productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }

  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const resetShippingCost = (cartItems, shippingCost) => {
  if (cartItems.length === 1 && cartItems[0].quantity === 1) {
    return 0;
  }

  return shippingCost;
};
