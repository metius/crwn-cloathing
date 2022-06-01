import { createContext, useReducer } from 'react';
import {createAction} from '../utils/reducer/reducer.utils';

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

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEM: 'SET_CART_ITEM'
}

const cartReducer = (state, action) => {
  const {type, payload} = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    
    case CART_ACTION_TYPES.SET_CART_ITEM:
      return {
        ...state,
        ...payload
      }

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const {isCartOpen, cartItems, cartCount, cartTotal} = state;


  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((acc, item) => acc + item.quantity, 0);

    const newCartTotal = newCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEM,{cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal}));
  }



  
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (isCartOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));
  }

  const value = {
    isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

  return(
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

