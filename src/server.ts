import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';

import { CustomError } from './errors/CustomError';

import { router } from './routes';

import swaggerFile from './swagger.json';

import './database';

import './shared/container';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return response.status(err.statusCode).json({ error: err.message }).send();
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error ${err.message}`,
  });

  next();
});

/*
* rotas de configuração de teste do debugger
app.get('/', (request, response) => {
    return response.json({ message: 'Hello from the other side!' });
});

app.post('/courses', (request, response) => {
    const { name } = request.body;
    return response.status(201).json({ name });
});
*/

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server listening on port ${port}!`));
