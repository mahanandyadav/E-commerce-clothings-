import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import  {ReactComponent as ShoppingIcon}  from '../../assets/shopping-bag.svg';
// import ShoppingIcon from '../../assets/ShoppingIcon';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

import { CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const isCartOpen=useSelector(selectIsCartOpen)
    const cartCount=useSelector(selectCartCount)

  const dispatch=useDispatch()
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
