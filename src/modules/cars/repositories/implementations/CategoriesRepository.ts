import { Repository, getRepository } from 'typeorm';
import { Category } from '../../entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // eslint-disable-next-line no-use-before-define
  // private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }
  // singleton
  // retorna o objeto para manutenção das categorias ou instancia o novo objeto.
  // public static getInstance(): CategoriesRepository {
  //  if (!CategoriesRepository.INSTANCE) {
  //    CategoriesRepository.INSTANCE = new CategoriesRepository();
  //  }
  //  return CategoriesRepository.INSTANCE;
  //

  async create({ description, name }: ICreateCategoryDTO): Promise<Category> {
    // cria entidade para poder salvar no banco de dados
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  // procura nome de categoria
  async findByName(name: string): Promise<Category> {
    // Select * from categories where{} name = "name" (findOne = limit 1)
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
