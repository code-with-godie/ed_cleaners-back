import express from 'express'
import { payWithCardV2, payWithMpesa, payWithPaypal, payWithPaypalV2, payWithPaypalV2GetOrder, payWithStripe } from '../controllers/paymentController.js';

const Router = express.Router()
Router.route('/card').post(payWithStripe);
Router.route('/cardV2').post(payWithCardV2);
Router.route('/mpesa').post(payWithMpesa);
Router.route('/paypalV2').post(payWithPaypalV2);
Router.route('/paypalV2GetOrder/:orderID/:payerID').get(payWithPaypalV2GetOrder);
Router.route('/paypal').post(payWithPaypal);
export default Router