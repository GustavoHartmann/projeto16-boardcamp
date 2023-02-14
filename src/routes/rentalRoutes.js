import { Router } from "express";
import { createRental } from "../controllers/rentalControllers.js";
import { rentalValidation } from "../middlewares/rentalValidation.js";

const router = Router();

router.post("/customers", rentalValidation, createRental);


export default router;