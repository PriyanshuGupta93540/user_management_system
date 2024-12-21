import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/database.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ROUTES CONNECTED
app.use("/api/v1/user", userRouter);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Port Connected, ${process.env.PORT}`);
});

export default app;
