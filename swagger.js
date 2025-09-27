import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AdFlow API',
      version: '1.0.0',
      description: 'Playable Ads SaaS Backend API',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local development server' },
    ],
  },
  apis: ['./src/routes/*.js'], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

// ✅ Export a setup function for Express
export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
