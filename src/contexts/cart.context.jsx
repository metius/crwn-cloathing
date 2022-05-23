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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  setCartCount: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // const newCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    // setCartCount(newCartCount);
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0))
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

  return(
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

