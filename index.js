import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for CORS

// All
app.use(cors());

// Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     alloweHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Book Management System");
});

app.use("/books", bookRoute);

mongoose
  .connect(mongoDBURL)
  .then((result) => {
    console.log("connected to database");
    app.listen(PORT, () => {
      // console.log(`App is Listening to port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
