import express from "express";
import User from "../../database/models/user.js";
import { check } from "express-validator";
const addInformation = express.Router();

addInformation.post(
  "/",
  [
    check("address", "Address must have 42 characters").isLength({
      min: 42,
      max: 42,
    }),
  ],
  async (req, res) => {
    const { address, name, email } = req.body;

    await User.findOne({ address: address }).then((user) => {
      if (!user) {
        return res.json({ message: "Address does not match!" });
      } else {
        user.name = name;
        user.email = email;
        user.save();
        res.json({
          user: user,
          message: "Successfully uploaded",
        });
      }
    });
  }
);

export default addInformation;
