import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    itemId: { type: String, required: true }, // The Medicine ID
    itemData: { type: Object, required: true }, // Snapshot of medicine details
    userData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    payment: { type: Boolean, default: false },
    status: { type: String, default: "Order Placed" } // Order Placed, Shipped, Completed
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;