import { Category } from '../../model/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

// singleton
class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  // retorna o objeto para manutenção das categorias ou instancia o novo objeto.
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }
  create({ description, name }: ICreateCategoryDTO): Category {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  // procura nome de categoria
  findByName(name: string): Category {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}

export { CategoriesRepository };
