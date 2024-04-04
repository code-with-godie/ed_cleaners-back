import express from 'express';
import authorize from '../../../middlewares/authentication.js'
import { booked, createBooking, deleteBooking, getBookingUserBooking, getBookings, updateBooking } from '../controllers/bookingController.js';
const Router = express.Router();

Router.route('/').post( authorize,createBooking).get(getBookings);
Router.route('/specific').get(authorize,getBookingUserBooking);
Router.route('/booked').get(booked);
Router.route('/:id').patch(updateBooking).delete(deleteBooking);

export default Router;
