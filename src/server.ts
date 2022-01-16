import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

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

app.listen(3333, () => console.log('Server Ready...'));
