const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const itemsRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const uploadRoutes = require('./routes/uploads');
const exchangesRoutes = require('./routes/exchanges');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/users', userRoutes);
server.use('/uploads', uploadRoutes);
server.use('/exchanges', exchangesRoutes);
server.use('/items', itemsRoutes);

server.listen(process.env.PORT || 8000);

console.log(`The server is listening on http://localhost:${process.env.PORT || 8000}`);