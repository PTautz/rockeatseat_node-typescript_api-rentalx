import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCarImagesUseCase } from "./deleteCarImagesUseCase";

class DeleteCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCarImagesUseCase = container.resolve(DeleteCarImagesUseCase);

    await deleteCarImagesUseCase.execute({ car_id: id });

    return response.status(200).json(`Image deleted`).send();
  }
}

export { DeleteCarImagesController };
