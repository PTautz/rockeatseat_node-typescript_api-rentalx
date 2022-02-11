import { Request, Response } from "express";

import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  // constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);

    // retornar url é uma boa prática nas rotas de upload de arquivo
    return response
      .status(201)
      .json({ url: `/categories/files/${file.filename}` })
      .send();
  }
}

export { ImportCategoryController };
