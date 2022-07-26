import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Buttonfaile_button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PayMentButton } from "./payment-form.style";
import React,{ useState } from "react";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPament] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPament(true);
    const response = await fetch("/.netlify/functions/create-paymnet-intent", {
      method: "post",
      headers: {
        "Content-Type": "applicaiton/json",
      },
      body: JSON.stringify({ amount: amount * 1000 }),
    }).then((res) => res.json());
    //route relative to
    // const clientSecret=response.paymentIntent.client_secret;
    const {
      paymentIntent: { client_secret },
    } = response;
    console.log(client_secret);

    const paymentResult = new stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "guest",
        },
      },
    });
    setIsProcessingPament(false);
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>credit card payment</h2>
        <CardElement />
        <PayMentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </PayMentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};
export default PaymentForm;
