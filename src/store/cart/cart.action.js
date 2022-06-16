import {CART_ACTION_TYPES} from './cart.types';

import {createAction} from '../../utils/reducer/reducer.utils';

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

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM ,newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM ,newCartItems);
}

export const clearItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = clearCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM ,newCartItems);
}

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);