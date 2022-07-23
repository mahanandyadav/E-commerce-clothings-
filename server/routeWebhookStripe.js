

const stripe = require('stripe');

const endpointSecret = "whsec_XnTz9yhZmTOE4YaxFKiCKylrNYd3uX7S"//unique per webhook api

const webhookStripe=async (req,res)=>{
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    console.log('error in webhook----------------------------------------------------------------------')
    console.log(err.message)
    return;
  }

  // Handle the event
  var payment_intent='na'
  switch (event.type) {
    case 'payment_intent.amount_capturable_updated':
       paymentIntent = event.data.object;
      console.log(paymentIntent)
      console.log(' handle the event payment_intent.amount_capturable_updated')
      break;
    case 'payment_intent.canceled':
       paymentIntent = event.data.object;
      console.log(paymentIntent)
      console.log( 'handle the event payment_intent.canceled')
      break;
    case 'payment_intent.created':
       paymentIntent = event.data.object;
      console.log(paymentIntent)
      console.log(' handle the event payment_intent.created')
      break;
    case 'payment_intent.partially_funded':
       paymentIntent = event.data.object;
      console.log(paymentIntent)
      console.log( 'handle the event payment_intent.partially_funded')
      break;
    case 'payment_intent.payment_failed':
       paymentIntent = event.data.object;
      console.log(paymentIntent)
      console.log( 'handle the event payment_intent.payment_failed')
      break;
    case 'payment_intent.processing':
       paymentIntent = event.data.object;
      console.log(paymentIntent)
      console.log(' handle the event payment_intent.processing')
      break;
    case 'payment_intent.requires_action':
       paymentIntent = event.data.object;
      console.log(paymentIntent)
      console.log( 'handle the event payment_intent.requires_action')
      break;
    case 'payment_intent.succeeded':
       paymentIntent = event.data.object;
      console.log(paymentIntent)
      console.log( 'handle the event payment_intent.succeeded')
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
      res.status(400).end()
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send({'message':event.data.object});
};
module.exports=webhookStripe