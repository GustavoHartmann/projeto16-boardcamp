import { db } from "../database/db.js";
import { customerSchema } from "../models/customerSchema.js";

export async function customerValidation(req, res, next) {
  const customer = req.body;
  const { id } = req.params;

  const { error } = customerSchema.validate(customer, { abortEarly: false });

  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(422).send(errors);
  }

  try {
    if (id) {
      const cpfAlreadyExists = await db.query(
        "SELECT * FROM customers WHERE cpf = $1",
        [customer.cpf]
      );

      if (cpfAlreadyExists.rowCount !== 0 && String(cpfAlreadyExists.rows[0].id) !== id) {
        return res.status(409).send({
          message: "This cpf already exists",
        });
      }
    } else {
      const cpfAlreadyExists = await db.query(
        "SELECT * FROM customers WHERE cpf = $1",
        [customer.cpf]
      );

      if (cpfAlreadyExists.rowCount !== 0) {
        return res.status(409).send({
          message: "This cpf already exists",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  res.locals.customer = customer;

  next();
}
