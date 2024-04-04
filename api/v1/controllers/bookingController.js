import Bookings from '../models/Bookings.js';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../../../errors/not-found.js';
import BadRequestError from '../../../errors/bad-request.js';

export const createBooking = async (req, res, next) => {
    try {
         const booking = await Bookings.create({...req.body});
        return res.status(StatusCodes.OK).json({ success: true, booking });
    } catch (error) {
        next(error);
    }
};
export const  booked = async (req, res, next) => {
    try {
         const bookings = await Bookings.find({status:'pending'},{date:1})
        return res.status(StatusCodes.OK).json({ success: true, bookings });
    } catch (error) {
        next(error);
    }
};
export const getBookingUserBooking = async (req, res, next) => {
    const {params:{id}} = req
    try {
         const bookings = await Bookings.find({user:id}).populate({ path:'user', select:'firstName lastName profilePic'}).populate({ path:'service'});
        return res.status(StatusCodes.OK).json({ success: true, bookings });
    } catch (error) {
        next(error);
    }
};
export const getBookings = async (req, res, next) => {
    try {
         const bookings = await Bookings.find({}).populate({ path:'user', select:'firstName lastName profilePic'}).populate({ path:'service'});;
        return res.status(StatusCodes.OK).json({ success: true, bookings });
    } catch (error) {
        next(error);
    }
};
export const updateBooking = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        let booking = await Bookings.findById(id);
        if(!booking){
            return new NotFoundError('no booking with the provided id')
        }
         await Bookings.findByIdAndUpdate(id,{...req.body},{new:true,runValidators:true})
          booking = await Bookings.findById(id).populate({ path:'user', select:'firstName lastName profilePic'}).populate({ path:'service'});
        return res.status(StatusCodes.OK).json({ success: true, booking });
    } catch (error) {
        next(error);
    }
};
export const deleteBooking = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        let service = await Bookings.findById(id);
        if(!service){
            return NotFoundError('no service with the provided id')
        }
        await Bookings.findByIdAndDelete(id)
        return res.status(StatusCodes.OK).json({ success: true, messege:'service successfully deleted' });
    } catch (error) {
        next(error);
    }
};
