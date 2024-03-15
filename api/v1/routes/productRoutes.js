import express from 'express';
import { createProduct,getCategoryProducts,getCategoryTitle,getProducts} from '../controllers/ProductController.js';
import authorize from '../../../middlewares/authentication.js'
const Router = express.Router();

Router.route('/').post(authorize,createProduct).get(getProducts);
Router.route('/category').get(getCategoryProducts);
Router.route('/title').get(getCategoryTitle);
// Router.route('/nav').get(getCategoryTitle);
// Router.route('/single/:id').get(getSingleProduct);

export default Router;
