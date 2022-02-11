import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCarSpecificationsUseCase } from "./deleteCarSpecificationsUseCase";

class DeleteCarSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCarSpecificationsUseCase = container.resolve(DeleteCarSpecificationsUseCase);

    await deleteCarSpecificationsUseCase.execute({
      car_id: id,
    });

    return response.status(201).json("Specifications deleted");
  }
}

export { DeleteCarSpecificationsController };
