import Services from '../models/Service.js';
import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../../../errors/not-found.js';
import BadRequestError from '../../../errors/bad-request.js';

export const createService = async (req, res, next) => {
    try {
         const service = await Services.create({...req.body});
        return res.status(StatusCodes.OK).json({ success: true, service });
    } catch (error) {
        next(error);
    }
};
export const getServices = async (req, res, next) => {
    try {
         const services = await Services.find({});
        return res.status(StatusCodes.OK).json({ success: true, services });
    } catch (error) {
        next(error);
    }
};
export const updateService = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        let service = await Services.findById(id);
        if(!service){
            return NotFoundError('no service with the provided id')
        }
        service = await Services.findByIdAndUpdate(id,{...req.body},{new:true,runValidators:true})
        return res.status(StatusCodes.OK).json({ success: true, service });
    } catch (error) {
        next(error);
    }
};
export const deleteService = async (req, res, next) => {
    try {
        const {params:{id}} = req;
        let service = await Services.findById(id);
        if(!service){
            return NotFoundError('no service with the provided id')
        }
        await Services.findByIdAndDelete(id)
        return res.status(StatusCodes.OK).json({ success: true, messege:'service successfully deleted' });
    } catch (error) {
        next(error);
    }
};
