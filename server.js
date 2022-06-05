const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const server = express();
server.use(express.json());

server.listen(process.env.PORT || 3001);
console.log(`The server is listening on http://localhost:${process.env.PORT || 3001}`);