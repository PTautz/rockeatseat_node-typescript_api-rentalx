/* eslint-disable prettier/prettier */
import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import { ISpecificationRepository, ICreateSpecificationDTO } from '../ISpecificationRepository';

class SpecificationsRepository implements ISpecificationRepository {
	private repository: Repository<Specification>;

	constructor() {
		this.repository = getRepository(Specification);
	}

	async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
		// quando cria um new Specification ele já cria o id, porque ele entende que não tem nenhum id preenchido
		const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
    return specification;

	}

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      name,
    });
      return specification;
  }
}
export { SpecificationsRepository };
