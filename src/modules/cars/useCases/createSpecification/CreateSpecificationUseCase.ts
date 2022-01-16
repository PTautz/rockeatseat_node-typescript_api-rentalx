import { AlreadyExistsError } from '../../model/AlreadyExistsError';
import { Specification } from '../../model/Specification';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists = this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AlreadyExistsError(409, 'Specification already exists!');
      // throw new Error('Specification already exists!');
    }

    const specificationCreated = this.specificationRepository.create({
      name,
      description,
    });
    return specificationCreated;
  }
}

export { CreateSpecificationUseCase };
