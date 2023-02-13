import { db } from "../database/db.js";
import { gameSchema } from "../models/gameSchema.js";

export async function gameValidation(req, res, next) {
  const game = req.body;

  const { error } = gameSchema.validate(game, { abortEarly: false });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(422).send(errors);
  }

  try {
    const nameExists = await db.query(
      "SELECT * FROM games WHERE name = $1", [game.name]
    );

    if (nameExists.rowCount !== 0) {
      return res.status(409).send({
        message: "This game already exists",
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  res.locals.game = game;

  next();
}
