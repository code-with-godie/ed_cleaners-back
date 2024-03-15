import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: '',
             required:[true,'please provide product title']
        },
        img: {
            type: String,
            default: '',
            required:[true,'please provide product image']
        },
        price: {
            type: String,
            default:'',
             required:[true,'please provide product price']
        },
        category: {
            type: String,
            default:'',
             required:[true,'please provide product category']
        },
        description: {
            type: String,
            default:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam minima iusto saepe, sit tempore, repellat laborum explicabo ab iure, laudantium maiores similique fugiat placeat iste inventore eum reprehenderit omnis veniam! Dolore, sit in rerum cumque reprehenderit debitis nam doloremque sequi corrupti repellendus. Quisquam blanditiis ratione maiores aliquid esse fugit ducimus numquam soluta rem! Deserunt, eveniet placeat reprehenderit debitis reiciendis deleniti',
        },
        quantity: {
            type: Number,
            default:1,
        },
    },
    { timestamps: true }
);

export default mongoose.model('products', productSchema);
