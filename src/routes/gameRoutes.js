import { Router } from "express";
import { createGame, findGames } from "../controllers/gameControllers.js";
import { gameValidation } from "../middlewares/gameValidation.js";

const router = Router();

router.post("/games", gameValidation, createGame);
router.get("/games", findGames);


export default router;
