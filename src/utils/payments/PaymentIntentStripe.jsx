import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutFormStripe from "./CheckoutFormStripe";
import "./PaymentIntentStripe.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51L8Qs3SIMProKj4qioseIVtzt8M659G4qp9Fv4DzPTzOYa0WD1qTxSd0UObqLNVUXcBs7pqTxqCHz1R4Pac5kVFp00wyo1CxxU");

export default function PaymentIntentStripe() {
  const [clientSecret, setClientSecret] = useState("");
  const items=[
    {
      id:"xl-tshirt" ,
      c_type:'winter',
      c_price:22,
      c_quantity:3
    }
  ]
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      body: JSON.stringify({ items:items}),
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
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutFormStripe />
        </Elements>
      )}
    </div>
  );
}