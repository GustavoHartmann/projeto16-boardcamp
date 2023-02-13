import { Router } from "express";
import {
  createCustomer,
  findCustomers,
  findCustomerById
} from "../controllers/customerControllers.js";
import { customerValidation } from "../middlewares/customerValidation.js";

const router = Router();

router.post("/customers", customerValidation, createCustomer);
router.get("/customers", findCustomers);
router.get("/customers/:id", findCustomerById);

export default router;
