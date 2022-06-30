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
server.use('/uploads', uploadRoutes);
server.use('/exchanges', exchangesRoutes);
server.use('/items', itemsRoutes);
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
server.use('/', (req, res) => {
    res.send(`<h1>Welcome to the Swap It API</h1><p>To check the swagger documentation please follow the link that follows: <a href='http://localhost:${process.env.PORT || 8000}/docs'>http://localhost:${process.env.PORT || 8000}/docs</a></p>`)
})

server.listen(process.env.PORT || 8000);

console.log(`
The server is listening on http://localhost:${process.env.PORT || 8000}
You can navigate the documentation at http://localhost:${process.env.PORT || 8000}/docs`
);