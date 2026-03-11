import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Instinct 4.0 API',
      version: '1.0.0',
      description:
        'Backend REST API for Instinct 4.0 — supports three user roles: **CITIZEN**, **ADMIN**, and **EXECUTIVE**.',
      contact: {
        name: 'Instinct 4.0',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the JWT token obtained from /api/auth/login',
        },
      },
      schemas: {
        Role: {
          type: 'string',
          enum: ['CITIZEN', 'ADMIN', 'EXECUTIVE'],
          example: 'CITIZEN',
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cmmm13zlw00004p5yspe7orsv' },
            email: { type: 'string', format: 'email', example: 'citizen@example.com' },
            name: { type: 'string', example: 'Jane Doe' },
            role: { $ref: '#/components/schemas/Role' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            email: { type: 'string', format: 'email', example: 'citizen@example.com' },
            password: { type: 'string', minLength: 8, example: 'password123' },
            name: { type: 'string', minLength: 2, example: 'Jane Doe' },
            role: { $ref: '#/components/schemas/Role' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'citizen@example.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' },
                token: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Something went wrong' },
            errors: { type: 'object', additionalProperties: true },
          },
        },
      },
    },
    tags: [
      { name: 'Health', description: 'Server health check' },
      { name: 'Auth', description: 'Register, login, and current-user endpoints' },
      { name: 'Users', description: 'User management (role-restricted)' },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.ts'), path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
