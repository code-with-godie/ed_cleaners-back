import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
    {
        service: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'services',
            required:[true,'please provide the service']
        },
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:[true,'please provide the  user who is bookings']
        },
        date: {
            type: String,
            required:[true,'please provide the booking date']
        },
        amount: {
            type: Number,
            required:[true,'please provide the booking amount']
        },
        address: {
            type: String,
        },
        receipt_url: {
            type: String,
        },
        paymentType: {
            type:String,
            enum: ['card','paypal','mpesa'],
            required:[true,'please indicate  payment method']
        },
        phone: {
            type: String,
        },
        status:{
            type:String,
            enum:['completed','pending'],
            default:'pending'
        }
    },
    { timestamps: true }
);

export default mongoose.model('bookings', bookingSchema);
