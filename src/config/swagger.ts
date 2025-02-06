// filepath: /Volumes/MacOs Disk 1/Fundoo_Notes_App/src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fundoo Notes API',
      version: '1.0.0',
      description: 'API documentation for Fundoo Notes',
    },
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT}/api/${process.env.API_VERSION}`,
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
  apis: ['./src/routes/*.ts', './src/config/swaggerDefinitions.ts'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};