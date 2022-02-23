import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CustomError } from "@shared/errors/CustomError";
import { deleteFile } from "@utils/file";

interface IRequest {
  car_id: string;
}

@injectable()
class DeleteCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id }: IRequest): Promise<void> {
    const carImageExists = await this.carsImagesRepository.findByCarId(car_id);

    if (!carImageExists) {
      throw new CustomError(404, "Image not found");
    }
    await deleteFile(`./tmp/cars/${carImageExists.image_name}`);
    await this.carsImagesRepository.delete(car_id);
  }
}

export { DeleteCarImagesUseCase };
