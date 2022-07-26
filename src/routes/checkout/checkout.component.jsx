import { useContext } from 'react';

import SnackbarCom from '../../components/snackbar/snackbar'
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import Button from '../../components/button/button.component';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  // const { cartItems, cartTotal } = useContext(CartContext);
  const cartItems=useSelector(selectCartItems)
  const cartTotal=useSelector(selectCartTotal)
  const navigate=useNavigate()
  const handleNavigationStripe=()=>{
    navigate('/stripe_pay')
  }
  return (
    <CheckoutContainer>
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
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: &#8377;{cartTotal}</Total>
      <Button
       buttonType={'stripe-pay'} 
       onClick={handleNavigationStripe}
       >Pay</Button>
       <SnackbarCom
       
       />
    </CheckoutContainer>
  );
};

export default Checkout;
