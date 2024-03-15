import { StatusCodes } from 'http-status-codes'
import Stripe from 'stripe'
import Paypal from '@paypal/checkout-server-sdk'
import paypal from 'paypal-rest-sdk'
export const payWithStripe = async  (req,res,next)=>{
    try {
        const stripe = new Stripe("sk_test_51OtYLvFx9vYQMEDvUJ35sGGO5eDM3Oi4XJ8h1KpxqeMx6NmQbX4Nnasc5u8BZWyMZqV1acQBLbaNWbY6rmjDvWhs001rLj272R");
        stripe.charges.create({
            source:req.body.tokenId,
            amount:req.body.amount,
            currency:'usd'
        },(stripeError,stripeRes)=>{
            if(stripeError){
               return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false,message:stripeError})
            }
            return  res.status(StatusCodes.OK).json({success:true,payment:stripeRes})

        })
    } catch (error) {
        next(error)
    }
}
export const payWithPaypalV2 = async (req,res,next)=>{
    const {body:{total}} = req;
    const amount = total / 100
    console.log(amount);
    try {
    paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id':"Ac_V17-Uqu3rwRtmzfVrjeeodF0FpDljx7GggUxmW1p5api5SlZO7QSd8e63_Z_0M4n2fhuSvXncoEzR",
  'client_secret':"EF1jnpGGuVa4og29v7zf283oRU74vOi7UqKfv9TdvC-9Ut7NRL2NuxS_v35KUfIyDgYgWtcguSE4cKIi"
});
let create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/failed"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": amount
        },
        "description": "pay ed_cleaners"
    }]
};
paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        next(error)
        // throw error;
    } else {
          for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
            //  return res.json({link:payment.links[i].href})
             return res.redirect(payment.links[i].href)
        }
      }
        // console.log("Create Payment Response",paypal);
        // console.log(payment);
        // res.json({payment})
    }
});
    } catch (error) {
        next(error)
    }
}
export const payWithPaypalV2GetOrder = async (req,res,next)=>{
    const {params:{orderID,payerID}} = req;
    console.log('trying getting order');
    try {
    paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id':"Ac_V17-Uqu3rwRtmzfVrjeeodF0FpDljx7GggUxmW1p5api5SlZO7QSd8e63_Z_0M4n2fhuSvXncoEzR",
  'client_secret':"EF1jnpGGuVa4og29v7zf283oRU74vOi7UqKfv9TdvC-9Ut7NRL2NuxS_v35KUfIyDgYgWtcguSE4cKIi"
});
     const execute_payment_json = {
    "payer_id": payerID,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1.00"
        }
    }]
  };

  paypal.payment.execute(orderID, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        next(error)
        return
    } else {
        console.log(JSON.stringify(payment));
        res.json({message:'Success',payment});
    }
});


    } catch (error) {
        next(error)
    }
}
export const payWithPaypal = async  (req,res,next)=>{
   try {
        const request = new Paypal.orders.OrdersCreateRequest();
        const PaypalClient = new Paypal.core.PayPalHttpClient(new Paypal.core.SandboxEnvironment("","ECtLDkH9cnJN2-s7gS4FS-2NtW8S4TQ3SWetQU7UvEclbDS8atUS0SHN5FElTOrtaRzKlWw40YNHRIHE"))
         request.prefer('return=representation');
        request.requestBody({
        intent:'CAPTURE',
        purchase_units:[
            {
                amount:{
                    currency_code:'USD',
                    value:100,
                    // currency_code:'USD',
                    // item_total:{
                    //     currency_code:'USD',
                    //     value:req.body.amount,
                        
                    // }
                }
            }
        ]
    })
    const order = await PaypalClient.execute(request);  
    return res.json({success:true,id:order?.result?.id,order}) 
    } catch (error) {
        next(error)
    }
}
export const payWithMpesa = async  (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}

// stripe payment

export const payWithCardV2 =  async (req, res) => {
    let stripeGateway = new Stripe(process.env.STRIPE_KEY);
    let DOMAIN = process.env.DOMAIN || 'http://localhost:3000';
        console.log(req.body.cart);

    
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${DOMAIN}/checkout`,
        cancel_url: `${DOMAIN}/checkout?payment_fail=true`,
        line_items: req.body.cart.map(item => {
            return {
               price_data: {
                   currency: "usd",
                   product: {
                       name: 'test title',
                       description: 'lorem test',
                       images: [item.productImage.url]
                   },
                   unit_amount: item.price
                //    unit_amount: item.price * 100
               },
               quantity: item.quantity
            }
        })
    })
         if (!session || !session.url) {
            throw new Error('Failed to create a Stripe session');
        }

    res.json(session.url)
}

// app.get('/success', async (req, res) => {
//     let { order, session_id } = req.query;
//     order = decodeURI(order);
    
//     try{
//         const session = await stripeGateway.checkout.sessions.retrieve(session_id);
//         // const customer = await stripeGateway.customers.retrieve(session.customer);

//         const customer = session.customer_details.email;

//         let date = new Date();

//         let orders_collection = collection(db, "orders");
//         let docName = `${customer.email}-order-${date.getTime()}`;

//         setDoc(doc(orders_collection, docName), JSON.parse(order))
//         .then(data => {
//             res.redirect('/checkout?payment=done')
//         })

//     } catch(err){
//         console.log(err)
//         res.json(err);
//         // res.redirect("/404");
//     }
// })


// Configure PayPal SDK with your credentials
// paypal.configure({
//   'mode': 'sandbox', // Change to 'live' for production
//   'client_id': 'YOUR_CLIENT_ID',
//   'client_secret': 'YOUR_CLIENT_SECRET'
// });

// // Create a payment
// const createPayment = () => {
//   const paymentData = {
//     intent: 'sale',
//     payer: {
//       payment_method: 'paypal'
//     },
//     redirect_urls: {
//       return_url: 'http://example.com/success',
//       cancel_url: 'http://example.com/cancel'
//     },
//     transactions: [{
//       amount: {
//         total: '10.00',
//         currency: 'USD'
//       },
//       description: 'Example payment'
//     }]
//   };

//   paypal.payment.create(paymentData, (error, payment) => {
//     if (error) {
//       console.error(error);
//     } else {
//       // Redirect the user to PayPal for payment approval
//       for (let i = 0; i < payment.links.length; i++) {
//         if (payment.links[i].rel === 'approval_url') {
//           console.log('Redirect to: ' + payment.links[i].href);
//           break;
//         }
//       }
//     }
//   });
// };

// createPayment();
