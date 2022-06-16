import { useDispatch, useSelector } from "react-redux";

import {addItemToCart, removeItemFromCart, clearItemFromCart} from '../../store/cart/cart.action';
import { selectCartItems } from "../../store/cart/cart.selector";

import {CheckoutItemContainer, ImageContainer, ItemImg, ItemProps, ItemQuantity, ItemValue, ItemArrow, RemoveButton} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem;

  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const addItem = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const clearItem = () => dispatch(clearItemFromCart(cartItems, cartItem));

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
      <RemoveButton onClick={clearItem}>&#10005;</RemoveButton>

    </CheckoutItemContainer>
  )
}

export default CheckoutItem;