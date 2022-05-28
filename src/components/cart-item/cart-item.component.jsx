import {CartItemContainer, CartItemImg, ItemDetails, Item} from './cart-item.styles.jsx';

const CartItem = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem;

  return (
    <CartItemContainer>
      <CartItemImg src={imageUrl} alt={`${name}`}/>
      <ItemDetails>
        <Item>{name}</Item>
        <Item>{quantity} x ${price}</Item>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem;