import { Category } from '../model/Category';

// DTO => Data Transfer Object
interface ICreateCategoryDTO {
	name: string;
	description: string;
}
class CategoriesRepository {
	private categories: Category[];

	constructor() {
		this.categories = [];
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
