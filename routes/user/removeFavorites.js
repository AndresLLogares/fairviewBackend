import express from "express";
import User from "../../database/models/user.js";
import { check } from "express-validator";
const removeFavorites = express.Router();

removeFavorites.post(
  "/",
  [
    check("address", "Address must have 42 characters").isLength({
      min: 42,
      max: 42,
    }),
  ],
  async (req, res) => {
    const { address, idNFT } = req.body;

    await User.findOne({ address: address }).then((user) => {
      if (!user) {
        return res.json({ message: "Address does not match!" });
      } else {
        user.idFavorite.splice(user.idFavorite.indexOf(idNFT), 1);
        user.favorites = user.favorites.filter(
          (favorite) => favorite.idNFT !== idNFT
        );
        user.save();
        res.json({
          user: user,
          message: "Removed from favorites",
        });
      }
    });
  }
);

export default removeFavorites;
