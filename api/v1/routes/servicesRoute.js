import express from 'express';
// import authorize from '../../../middlewares/authentication.js'
import { createService, deleteService, getServices, updateService } from '../controllers/serviceController.js';
const Router = express.Router();

Router.route('/').post(createService).get(getServices);
Router.route('/:id').patch(updateService).delete(deleteService);

export default Router;
