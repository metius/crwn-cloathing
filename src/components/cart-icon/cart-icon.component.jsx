import {useContext} from 'react'

import {CartContext} from '../../contexts/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  // const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return(
    <div className='cart-icon-container'>
      <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen}/>
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon;