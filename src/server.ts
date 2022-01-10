import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);

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
