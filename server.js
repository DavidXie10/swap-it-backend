const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

dotenv.config();

const swaggerFile = require('./swagger.json');
const itemsRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const uploadRoutes = require('./routes/uploads');
const exchangesRoutes = require('./routes/exchanges');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/users', userRoutes);
server.use('/items', itemsRoutes);
server.use('/exchanges', exchangesRoutes);
server.use('/uploads', uploadRoutes);
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

server.listen(process.env.PORT || 8000);

console.log(`
The server is listening on http://localhost:${process.env.PORT || 8000}
You can navigate the documentation at http://localhost:${process.env.PORT || 8000}/docs`
);