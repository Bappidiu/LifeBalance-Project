import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true }, // How many items available
    available: { type: Boolean, default: true }, // Logic: if stock > 0, true
    category: { type: String, default: "General" },
    date: { type: Number, required: true }
})

const medicineModel = mongoose.models.medicine || mongoose.model("medicine", medicineSchema);
export default medicineModel;