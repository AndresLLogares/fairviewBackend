import express from "express";
import User from "../../database/models/user.js";
import { check } from "express-validator";
const getUser = express.Router();

getUser.post(
  "/",
  [
    check("address", "Address must have 42 characters").isLength({
      min: 42,
      max: 42,
    }),
  ],
  async (req, res) => {
    const { address } = req.body;

    await User.findOne({ address: address }).then((user) => {
      if (!user) {
        return res.json({ message: "Address does not match!" });
      } else {
        return res.json({
          address: user.address,
          email: user.email,
          picture: user.picture,
          name: user.name,
          favorites: user.favorites,
          transactions: user.transactions,
          idFavorite: user.idFavorite,
        });
      }
    });
  }
);

export default getUser;
