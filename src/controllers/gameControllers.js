import { db } from "../database/db.js";

export async function createGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals.game;
  try {
    await db.query(
      'INSERT INTO games ("name", "image", "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
      [name, image, stockTotal, pricePerDay]
    );

    sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function findGames(req, res) {
  try {
    const { rows } = await db.query("SELECT * FROM games");

    res.send(rows);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
