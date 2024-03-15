import Products from '../models/Product.js';
import Users from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../../../errors/not-found.js';
import BadRequestError from '../../../errors/bad-request.js';

export const createProduct = async (req, res, next) => {
    try {
         const product = await Products.create({...req.body});
        return res.status(StatusCodes.OK).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};
export const getProducts = async (req, res, next) => {
    try {
           const products = await Products.find({});
        return res.status(StatusCodes.OK).json({ success: true, products });
    } catch (error) {
        next(error);
    }
};
export const sellProduct = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        let product = await Products.findById(id);
        if(!product){
            return NotFoundError('no product with the provided id')
        }
        product = await Products.findByIdAndUpdate(id,{$inc:{quantity:1}},{new:true,runValidators:true})
        return res.status(StatusCodes.OK).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};
export const updateProduct = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        let product = await Products.findById(id);
        if(!product){
            return NotFoundError('no product with the provided id')
        }
        product = await Products.findByIdAndUpdate(id,{...req.body},{new:true,runValidators:true})
        return res.status(StatusCodes.OK).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};
export const getSpecificProduct = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        let product = await Products.findById(id);
        if(!product){
            return NotFoundError('no product with the provided id')
        }
        product = await Products.findById(id);
        return res.status(StatusCodes.OK).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};
export const deleteProduct = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        let product = await Products.findById(id);
        if(!product){
            return NotFoundError('no product with the provided id')
        }
        await Products.findByIdAndDelete(id)
        return res.status(StatusCodes.OK).json({ success: true, messege:'product successfully deleted' });
    } catch (error) {
        next(error);
    }
};
export const getCategoryProducts = async (req, res, next) => {
    try {
        const {query:{cat}} = req;
        let products;
        if(cat && cat !== 'all'){
            products = await Products.find({category:{$in:cat}});
        }else{ 
            products = await Products.aggregate([{
                $sample:{size:200}
            }])
        }
        return res.status(StatusCodes.OK).json({ success: true, products });
    } catch (error) {
        next(error);
    }
};

export const getCategoryTitle = async (req, res, next) => {
    try {
            const categories = await Products.distinct('category');
       
        return res.status(StatusCodes.OK).json({ success: true, categories });
    } catch (error) {
        next(error);
    }
};
