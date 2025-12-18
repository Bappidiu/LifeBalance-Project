import express from 'express';
import { addMedicine, listMedicines, toggleAvailability } from '../controllers/medicineController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const medicineRouter = express.Router();

medicineRouter.post('/add', authAdmin, upload.single('image'), addMedicine);
medicineRouter.get('/list', listMedicines);
medicineRouter.post('/toggle', authAdmin, toggleAvailability);

export default medicineRouter;