import { db } from "../database/db.js";

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer;

  try {
    await db.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
