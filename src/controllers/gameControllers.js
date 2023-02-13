import { db } from "../database/db.js";

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals.game;
  try {
    await db.query(
      'INSERT INTO games ("name", "image", "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
      [name, image, stockTotal, pricePerDay]
    );
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
