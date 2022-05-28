import { useContext } from "react";

import {CartContext} from '../../contexts/cart.context';

import {CheckoutItemContainer, ImageContainer, ItemImg, ItemProps, ItemQuantity, ItemValue, ItemArrow} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem;

  const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);

  const addItem = () => addItemToCart(cartItem);
  const removeItem = () => removeItemFromCart(cartItem);
  const clearItem = () => clearItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <ItemImg src={imageUrl} alt={`${name}`}/>
      </ImageContainer>

      <ItemProps>{name}</ItemProps>
      <ItemQuantity>
        <ItemArrow onClick={removeItem}>&#10094;</ItemArrow>
        <ItemValue>{quantity}</ItemValue>
        <ItemArrow onClick={addItem}>&#10095;</ItemArrow>
      </ItemQuantity>
      <ItemProps>${price}</ItemProps>
      <div className='remove-button' onClick={clearItem}>&#10005;</div>

    </CheckoutItemContainer>
  )
}

export default CheckoutItem;