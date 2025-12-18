import orderModel from "../models/orderModel.js";
import medicineModel from "../models/medicineModel.js";
import userModel from "../models/userModel.js";

// Place Order
const placeOrder = async (req, res) => {
    try {
        const { userId, itemId } = req.body; // userId comes from authUser middleware

        const itemData = await medicineModel.findById(itemId);
        const userData = await userModel.findById(userId).select('-password');

        if (!itemData || !itemData.available || itemData.stock <= 0) {
            return res.json({ success: false, message: "Item out of stock" });
        }

        const orderData = {
            userId,
            itemId,
            itemData,
            userData,
            amount: itemData.price,
            date: Date.now(),
            payment: false,
            status: "Order Placed"
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Cancel Order
const cancelOrder = async (req, res) => {
    try {
        const { userId, orderId } = req.body;
        const orderData = await orderModel.findById(orderId);

        if (orderData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        await orderModel.findByIdAndUpdate(orderId, { status: "Cancelled" });
        res.json({ success: true, message: "Order Cancelled" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// List User Orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// List All Orders (Admin)
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update Order Status (Admin)
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, cancelOrder, userOrders, allOrders, updateStatus };