import { inject, injectable } from 'tsyringe';

import { CustomError } from '../../../../errors/CustomError';

import { Specification } from '../../entities/Specification';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new CustomError(409, 'Specification already exists!');
      // throw new Error('Specification already exists!');
    }

    const specificationCreated = await this.specificationRepository.create({
      name,
      description,
    });
    return specificationCreated;
  }
}

export { CreateSpecificationUseCase };
