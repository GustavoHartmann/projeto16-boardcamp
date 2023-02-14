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

export async function findRentals(req, res) {
  try {
    const { rows } = await db.query(
      `SELECT rentals.*, customers.id AS "idCustomer", customers.name AS "customerName",
       games.id AS "idGame", games.name AS "gameName",
       FROM rentals JOIN costumers ON rentals."costumerId" = "idCustomer"
       JOIN games ON rentals."gameId" = "idGame"`
    );

    const rentals = rows.map(
      ({ customerId, customerName, idGame, gameName, ...rental }) => {
        return {
          ...rental,
          customer: {
            id: customerId,
            name: customerName,
          },
          game: {
            id: idGame,
            name: gameName,
          },
        };
      }
    );

    res.send(rentals);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
