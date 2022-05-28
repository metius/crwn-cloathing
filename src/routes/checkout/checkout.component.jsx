import { useContext, useEffect } from "react";

import {CartContext} from '../../contexts/cart.context';

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {CheckoutContaioner, CheckoutHeader, HeaderBlock, Total} from './checkout.styles';

const Checkout = () => {
  const { setIsCartOpen, cartItems, cartTotal} = useContext(CartContext);

  useEffect(() => {
    setIsCartOpen(false);
  }, [setIsCartOpen]);

  return (
    <CheckoutContaioner>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContaioner>
  )
}

export default Checkout