import { db } from "../database/db.js";

export async function createRental(req, res) {
  const {
    customerId,
    gameId,
    rentDate,
    daysRented,
    originalPrice,
    returnDate,
    delayFee,
  } = res.locals.rental;

  try {
    await db.query(
      `INSERT INTO rentals ("customerId","gameId","rentDate", "daysRented", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        originalPrice,
        returnDate,
        delayFee,
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
