import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
	const { name, description } = request.body;

	const categoryAlreadyExists = categoriesRepository.findByName(name);

	if (categoryAlreadyExists) {
		return response.status(400).json({ error: 'Category already exists!' });
	}
	const categoryCreated = categoriesRepository.create({ name, description });

	return response.status(201).json({ categoryCreated }).send();
});

categoriesRoutes.get('/', (request, response) => {
	const listRepositories = categoriesRepository.list();

	return response.json(listRepositories);
});

export { categoriesRoutes };
