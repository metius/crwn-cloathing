import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {selectCartItems, selectCartTotal} from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action';

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {CheckoutContaioner, CheckoutHeader, HeaderBlock, Total} from './checkout.styles';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsCartOpen(false));
  }, []);

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