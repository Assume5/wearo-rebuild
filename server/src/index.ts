const http = require("http");
import app from "./app";
import { redisClient } from "./services/redis";

// import { createAdapter } from "@socket.io/cluster-adapter";
// const { setupWorker } = require("@socket.io/sticky");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    app.listen(PORT, async () => {
      redisClient.on("error", (err) => console.log("Redis Client Error", err));
      await redisClient.connect();
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
