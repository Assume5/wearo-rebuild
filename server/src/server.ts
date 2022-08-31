const http = require("http");
import app from "./app";

// import { createAdapter } from "@socket.io/cluster-adapter";
// const { setupWorker } = require("@socket.io/sticky");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
