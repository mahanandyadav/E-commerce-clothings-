import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCartCount,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import ShoppingIcon from '../../assets/shopping-bag.svg';

import { CartIconContainer, ItemCount } from './cart-icon.styles';
import { useRef } from 'react';
import useOutsideAlerter from '../../utils/UseOutsideAlert';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  let wrapperRef = useRef(null);
  if(!isCartOpen){
    wrapperRef=''
  }
  
  useOutsideAlerter(wrapperRef)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen} className='cart' ref={wrapperRef||null} >
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
