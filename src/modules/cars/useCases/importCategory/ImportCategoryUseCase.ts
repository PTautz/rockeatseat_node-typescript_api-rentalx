import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // createReadStream permite leitura do arquivo em partes
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();
      // pipe pega o que for lido(cada chunck lido) na stream e joga para o local determinado -> ()
      stream.pipe(parseFile);

      parseFile
        .on("data", async line => {
          // ["name", "description"]
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          // deleção do arquivo enviado após a varredura
          // fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    // verifica se existe categoria com o mesmo nome
    categories.map(async category => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
