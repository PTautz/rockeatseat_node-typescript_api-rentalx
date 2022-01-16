import { AlreadyExistsError } from '../../model/AlreadyExistsError';

import { Category } from '../../model/Category';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      // throw new Error('Category already exists!');
      throw new AlreadyExistsError(409, 'Category already exists!');
    }
    const categoryCreated = this.categoriesRepository.create({ name, description });

    return categoryCreated;
  }
}

export { CreateCategoryUseCase };
