import { Request, Response } from "express";

import { container } from "tsyringe";
import { DeleteCarUseCase } from "./DeleteCarUseCase";

class DeleteCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { license_plate } = request.body;

    const deleteCarUseCase = container.resolve(DeleteCarUseCase);

    const carDeleted = await deleteCarUseCase.execute({ license_plate });

    return response.status(200).json({ carDeleted }).send();
  }
}

export { DeleteCarController };
