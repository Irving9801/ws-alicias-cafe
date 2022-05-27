const express = require("express");
const userSchema = require("../models/menu");

const router = express.Router();

// create user
/**
 * @swagger
 * components:
 *  schemas:
 *      Menu:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Name of the user
 *              price:
 *                  type: integer
 *                  description: Age of the user
 *              description:
 *                  type: string
 *                  description: the email of the use
 *          required:
 *              - name
 *              - price
 *              - description
 *          example:
 *              name: John Doe
 *              price: 30
 *              description:  hecha de queso
 */

/**
 * @swagger
 * /api/menu:
 *  post:
 *    summary: Create a new user
 *    tags: [Menu]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Menu'
 *    responses:
 *      200:
 *        description: A successful response
 */
router.post("/menu", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: return all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/User'
 */

// get all users
router.get("/menu", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
