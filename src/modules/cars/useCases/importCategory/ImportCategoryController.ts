import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategoryUseCase.execute(file);

    // retornar url é uma boa prática nas rotas de upload de arquivo
    return response.json({ url: `/categories/files/${file.filename}` }).send();
  }
}

export { ImportCategoryController };
