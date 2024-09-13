const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes'); // Pastikan rute ini diimpor
const categoryRoutes = require('./routes/categoryRoutes');
const bookBorrowRoutes = require('./routes/bookBorrowRoutes');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
    servers: [
      {
        url: 'http://localhost:8082',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/**/*.js'], // Path ke file yang mengandung komentar Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
const swaggerSetup = swaggerUi.serve;
const swaggerUiSetup = swaggerUi.setup(swaggerDocs);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerSetup, swaggerUiSetup);

app.use('/api/users', userRoutes);
app.use('/api', authorRoutes); // Tambahkan path untuk authorRoutes
app.use('/api/categories', categoryRoutes); // Pastikan pathnya benar
app.use('/api/book-borrow', bookBorrowRoutes);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
