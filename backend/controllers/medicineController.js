import medicineModel from "../models/medicineModel.js";
import { v2 as cloudinary } from "cloudinary";

// API to add medicine (Admin)
const addMedicine = async (req, res) => {
    try {
        const { name, price, description, stock, category } = req.body;
        const imageFile = req.file;

        if (!name || !price || !description || !stock) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const medicineData = {
            name,
            price: Number(price),
            description,
            stock: Number(stock),
            category,
            image: imageUrl,
            available: Number(stock) > 0 ? true : false,
            date: Date.now()
        }

        const newMedicine = new medicineModel(medicineData);
        await newMedicine.save();

        res.json({ success: true, message: "Medicine Added Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to list all medicines (Frontend & Admin)
const listMedicines = async (req, res) => {
    try {
        const medicines = await medicineModel.find({});
        res.json({ success: true, medicines });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to toggle availability (Admin) - Optional logic if you want manual override
const toggleAvailability = async (req, res) => {
    try {
        const { medId } = req.body;
        const medData = await medicineModel.findById(medId);
        await medicineModel.findByIdAndUpdate(medId, { available: !medData.available });
        res.json({ success: true, message: "Availability Changed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addMedicine, listMedicines, toggleAvailability };