const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const userRoutes = require('./routes/users');

dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());

server.use('/users', userRoutes);

server.listen(process.env.PORT || 8000);
console.log(`The server is listening on http://localhost:${process.env.PORT || 8000}`);