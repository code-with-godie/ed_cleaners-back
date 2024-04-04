import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:[true,'please provide service title']
        },
        description: {
            type: String,
        },
        price: {
            type: String,
        },
        priceNumber: {
            type: Number,
        },
        img: {
            type:String,
            required:[true,'please service image']
        }  
      },
    { timestamps: true }
);

export default mongoose.model('services', serviceSchema);
