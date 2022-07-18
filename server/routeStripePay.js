

const stripe =require('stripe')('sk_test_51L8Qs3SIMProKj4qW1cHjHo1Yg1W3YaWXBkS6sNxA0WDmaqghgQ32oXxPRizLA0RwEbBGlYMI9GQpg7OhlgI1TKI00vUZk7tEq')

const calculateOrderAmount = (items) => {
  
    // let total=items[0].c_price*items[0].c_quantity
    // console.log(total+"       ::calculateOrder")

    return items>0 ? items : 1
  };

const routeStripePay=async(req,res)=>{
    const { items } = req.body;
    console.log(items)
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "inr",
      description: 'Software development services',
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
}

module.exports=routeStripePay