import { Response, Request } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      // const createCategoryService = new CreateCategoryService(categoriesRepository);

      const categoryCreated = this.createCategoryUseCase.execute({ name, description });

      return response.status(201).json({ categoryCreated }).send();
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message }).send();
    }
  }
}

export { CreateCategoryController };
