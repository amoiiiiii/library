import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Author API',
      version: '1.0.0',
      description: 'API documentation for managing authors',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Format token
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path ke file-file yang berisi anotasi Swagger
};

export default options;
