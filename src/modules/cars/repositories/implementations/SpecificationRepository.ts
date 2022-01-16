/* eslint-disable prettier/prettier */
import { Specification } from '../../model/Specification';
import { ISpecificationRepository, ICreateSpecificationDTO } from '../ISpecificationRepository';

class SpecificationsRepository implements ISpecificationRepository {
	private specification: Specification[];

	constructor() {
		this.specification = [];
	}
  

	create({ name, description }: ICreateSpecificationDTO): Specification {
		// quando cria um new Specification ele já cria o id, porque ele entende que não tem nenhum id preenchido
		const specification = new Specification();

		Object.assign(specification, { 
      name,
      description, 
      created_at: new Date(),
    });

    this.specification.push(specification);
    return specification;

	}

  findByName(name: string): Specification {
    const specification = this.specification.find(
      (specification) => specification.name === name
    );
    return specification;
  }
}
export { SpecificationsRepository };
