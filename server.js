const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const uploadRoutes = require("./routes/uploads");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/uploads", uploadRoutes);

server.listen(process.env.PORT || 8000);
console.log(`The server is listening on http://localhost:${process.env.PORT || 8000}`);