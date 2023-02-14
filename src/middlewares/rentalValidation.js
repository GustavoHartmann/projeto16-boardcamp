import { db } from "../database/db.js";
import { rentalSchema } from "../models/rentalSchema.js";

export async function rentalValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const gameExists = await db.query("SELECT * FROM games WHERE id = $1", [
      gameId,
    ]);
    const customerExists = await db.query(
      "SELECT * FROM customer WHERE id = $1",
      [customerId]
    );

    if (
      customerExists.rowCount === 0 ||
      gameExists.rowCount === 0 ||
      daysRented <= 0
    ) {
      return res.sendStatus(400);
    }

    const originalPrice = daysRented * gameExists.rows[0].pricePerDay;

    const rental = {
      customerId,
      gameId,
      rentDate: new Date(),
      daysRented,
      originalPrice,
      returnDate: null,
      delayFee: null,
    };

    const { error } = rentalSchema.validate(rental, { abortEarly: false });

    if (error) {
      const errors = error.details.map((d) => d.message);
      return res.status(400).send(errors);
    }

    const existingRentals = await connectionDB.query(
      `SELECT * FROM rentals WHERE "gameId" = $1`,
      [gameExists.rows[0].id]
    );

    console.log(existingRentals.rows.length);

    if (existingRentals.rows.length > gameExists.rows[0].stockTotal) {
      return res.sendStatus(400);
    }

    res.locals.rental = rental;

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
