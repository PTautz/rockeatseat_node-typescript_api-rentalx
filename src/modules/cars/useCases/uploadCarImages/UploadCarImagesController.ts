import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_names = images.map(file => file.filename);

    await uploadCarImagesUseCase.execute({ car_id: id, images_names });

    return response
      .status(201)
      .json({ url: `./tmp/cars/${images_names} - Image associate to this car id : ${id}` })
      .send();
  }
}

export { UploadCarImagesController };
