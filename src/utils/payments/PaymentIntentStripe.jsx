import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./PaymentIntentStripe.css";
import CheckoutFormStripe from "./CheckoutFormStripe";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";
import PreventRouterHoc from "../../components/hoc/preventRouteHoc";

const stripePromise = loadStripe("pk_test_51L8Qs3SIMProKj4qioseIVtzt8M659G4qp9Fv4DzPTzOYa0WD1qTxSd0UObqLNVUXcBs7pqTxqCHz1R4Pac5kVFp00wyo1CxxU");

 function PaymentIntentStripe() {
  const [clientSecret, setClientSecret] = useState("");
  /*const items=[
    {
      id:"xl-tshirt" ,
      c_type:'winter',
      c_price:22,
      c_quantity:3
    }
  ]*/
  const cartTotal=useSelector(selectCartTotal)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3001/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      body: JSON.stringify({ items: cartTotal }),
      // body: JSON.stringify(cartTotal),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div >
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <div>
          <h1 id="amount_h1">Total &#8377;{cartTotal}</h1>
          </div>
          <CheckoutFormStripe />
        </Elements>
      )}
    </div>
  );
}

export default PreventRouterHoc(PaymentIntentStripe)