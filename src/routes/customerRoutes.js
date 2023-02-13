import { Router } from "express";
import {
  createCustomer,
  findCustomers,
} from "../controllers/customerControllers.js";
import { customerValidation } from "../middlewares/customerValidation.js";

const router = Router();

router.post("/customers", customerValidation, createCustomer);
router.get("/customers", findCustomers);

export default router;
