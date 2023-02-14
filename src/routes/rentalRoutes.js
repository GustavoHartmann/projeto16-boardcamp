import { Router } from "express";
import { createRental, findRentals } from "../controllers/rentalControllers.js";
import { rentalValidation } from "../middlewares/rentalValidation.js";

const router = Router();

router.post("/customers", rentalValidation, createRental);
router.get("/customers", findRentals);


export default router;