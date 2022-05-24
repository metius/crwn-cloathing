import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const exsistsingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

  //if found, increment quantity
  if(exsistsingCartItem) {
    return cartItems.map(cartItem => cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1} 
      : cartItem
    );
  }

  //return new array with modified cartItems/new cart item
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const clearCartItem = (cartItems, productToDelete) => cartItems.filter(cartItem => cartItem.id !== productToDelete.id);

const removeCartItem = (cartItems, productToRemove) => {
 
  //if quantity > 1 --> return array with quantity - 1
  if(productToRemove.quantity > 1) {
    return cartItems.map(cartItem => cartItem.id === productToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
    );
  } else {
    // return cartItems.filter(cartItem => cartItem.id != productToRemove.id);
    return clearCartItem(cartItems, productToRemove);
  }
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems])

  useEffect(() => {
    setCartTotal(cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0));
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

  return(
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

