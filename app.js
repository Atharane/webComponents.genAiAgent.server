import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "12mb" }));
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3000"
//         : `${process.env.CLIENT_PRODUCTION_URL}`,
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

// app.set("trust proxy", 1);

app.use("/api/v1", userRoutes);

app.get("/status", (_, res) => {
  return res.send({
    status: true,
    message: "SUCCESS",
  });
});

const port = process.env.PORT || 8080;
const dbURI = process.env.MONGO_DB_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => {
      console.log(`⚡️[server]: server live on http://localhost:${port}`);
    })
  )
  .catch((err) => console.log(err));
