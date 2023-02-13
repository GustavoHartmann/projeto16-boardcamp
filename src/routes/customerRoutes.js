import { Router } from "express";
import { createCustomer } from "../controllers/customerControllers.js";
import { customerValidation } from "../middlewares/customerValidation.js";

const router = Router();

router.post("/customers", customerValidation, createCustomer);

export default router;
