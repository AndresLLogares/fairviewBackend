import express from "express";
import User from "../../database/models/user.js";
import { check } from "express-validator";
const addUser = express.Router();

addUser.post(
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
      if (user) {
        return res.json({
          success: false,
          message: "Address already exists",
        });
      } else {
        const newUser = new User({
          address: address,
        });

        newUser
          .save()
          .then((user) =>
            res.json({
              success: true,
              message: "Thanks for registering",
            })
          )
          .catch((err) => console.log(err));
      }
    });
  }
);

export default addUser;
