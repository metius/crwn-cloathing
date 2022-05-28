import {useContext} from 'react'

import {CartContext} from '../../contexts/cart.context';

import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles';

const CartIcon = () => {
  const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  // const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return(
    <CartIconContainer>
      <ShoppingIcon onClick={toggleIsCartOpen}/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;