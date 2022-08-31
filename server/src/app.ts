import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import path from "path";
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
    origin: ["*"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export default app;
