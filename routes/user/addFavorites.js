import express from "express";
import User from "../../database/models/user.js";
import { check } from "express-validator";
const addFavorites = express.Router();

addFavorites.post(
  "/",
  [
    check("address", "Address must have 42 characters").isLength({
      min: 42,
      max: 42,
    }),
  ],
  async (req, res) => {
    const { address, addressNFT, nameNFT, pictureNFT, idNFT, descriptionNFT } =
      req.body;

    await User.findOne({ address: address }).then((user) => {
      if (!user) {
        return res.json({ message: "Address does not match!" });
      } else if (user.idFavorite.includes(idNFT)) {
        return res.json({ message: "Already in favorites" });
      } else {
        user.idFavorite.push(idNFT);
        user.favorites.push({
          addressNFT: addressNFT,
          nameNFT: nameNFT,
          pictureNFT: pictureNFT,
          idNFT: idNFT,
          descriptionNFT: descriptionNFT,
        });
        user.save();
        res.json({
          user: user,
          message: "Added to favorites",
        });
      }
    });
  }
);

export default addFavorites;
