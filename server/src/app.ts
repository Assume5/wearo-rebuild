import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import path from "path";
import api from "./routes";
require("dotenv").config();

const app = express();
//middleware

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "public", "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(api);
export default app;
