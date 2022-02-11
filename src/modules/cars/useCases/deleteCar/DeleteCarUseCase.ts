import { inject, injectable } from "tsyringe";

import { DeleteResult } from "typeorm";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CustomError } from "@shared/errors/CustomError";

interface IRequest {
  license_plate: string;
}

@injectable()
class DeleteCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ license_plate }: IRequest): Promise<DeleteResult> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

    if (!carAlreadyExists) {
      throw new CustomError(404, "Car do not exists!");
    }

    return this.carsRepository.delete(license_plate);
  }
}

export { DeleteCarUseCase };
