import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AddUser from "./routes/user/addUser.js";
import GetUser from "./routes/user/getUser.js";
import AddPicture from "./routes/user/addPicture.js";
import AddInformation from "./routes/user/addInformation.js";
import addFavorites from "./routes/user/addFavorites.js";
import removeFavorites from "./routes/user/removeFavorites.js";
import morgan from "morgan";

dotenv.config();

const app = express();

const { PORT } = process.env || 5000;

const CONNECTION_URL = process.env.URI;

app.use(bodyparser.json({ limit: "30mb", extende: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extende: true }));
app.use(cors());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to FairView");
});

app.use("/adduser", AddUser);
app.use("/getuser", GetUser);
app.use("/addpicture", AddPicture);
app.use("/addinformation", AddInformation);
app.use("/addfavorite", addFavorites);
app.use("/removefavorite", removeFavorites);

mongoose
  .connect(CONNECTION_URL)

  .then(() =>
    app.listen(PORT, () => console.log(`Server running on server ${PORT}`))
  )
  .catch((err) => {
    console.log(err);
  });
