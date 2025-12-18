import express from 'express';
import { placeOrder, userOrders, allOrders, updateStatus, cancelOrder } from '../controllers/orderController.js';
import authUser from '../middlewares/authUser.js';
import authAdmin from '../middlewares/authAdmin.js';

const orderRouter = express.Router();

orderRouter.post('/place', authUser, placeOrder);
orderRouter.get('/user-orders', authUser, userOrders);
orderRouter.post('/cancel', authUser, cancelOrder);
orderRouter.get('/list', authAdmin, allOrders);
orderRouter.post('/status', authAdmin, updateStatus);

export default orderRouter;