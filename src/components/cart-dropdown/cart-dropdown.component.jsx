import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItems,selectIsCartOpen } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useRef } from 'react';
import useOutsideAlerter from '../../utils/UseOutsideAlert';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };
  console.log(isCartOpen)
  let wrapperRef = useRef(null);
  if(!isCartOpen){
    wrapperRef=''
  }
  useOutsideAlerter(wrapperRef);
  
  return (
    <CartDropdownContainer >
      <CartItems  >
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}  ref={wrapperRef || null}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
