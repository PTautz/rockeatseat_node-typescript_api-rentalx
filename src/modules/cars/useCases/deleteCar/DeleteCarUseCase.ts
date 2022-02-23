import { inject, injectable } from "tsyringe";

import { DeleteResult } from "typeorm";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { CustomError } from "@shared/errors/CustomError";

interface IRequest {
  license_plate: string;
}

@injectable()
class DeleteCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute({ license_plate }: IRequest): Promise<DeleteResult> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

    if (!carAlreadyExists) {
      throw new CustomError(404, "Car do not exists!");
    }

    const rentalExists = await this.rentalsRepository.findRentalByCar(carAlreadyExists.id);
    if (rentalExists) {
      throw new CustomError(400, "Cannot delete a car with a rent assigned!");
    }

    return this.carsRepository.delete(license_plate);
  }
}

export { DeleteCarUseCase };
