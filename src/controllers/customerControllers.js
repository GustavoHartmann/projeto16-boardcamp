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

export async function findCustomers(req, res) {
    try {
      const { rows } = await db.query("SELECT * FROM customers");
  
      res.send(rows);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }

  export async function findCustomerById(req, res) {
    const { id } = req.params;

    try {
      const { rows } = await db.query(
        `SELECT * FROM customers WHERE id = $1 `,
        [id]
      );
  
      if (rows.length === 0) {
        return res.sendStatus(404);
      }
  
      res.send(rows[0]);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
  }