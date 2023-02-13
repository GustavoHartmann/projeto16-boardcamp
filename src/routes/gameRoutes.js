import { Router } from "express";
import { createGame } from "../controllers/gameControllers.js";
import { gameValidation } from "../middlewares/gameValidation.js";

const router = Router();

router.post("/games", gameValidation, createGame);

export default router;
