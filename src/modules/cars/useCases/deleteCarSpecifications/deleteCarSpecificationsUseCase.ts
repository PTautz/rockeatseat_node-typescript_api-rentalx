import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { CustomError } from "@shared/errors/CustomError";

interface IRequest {
  car_id: string;
}

@injectable()
class DeleteCarSpecificationsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ car_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (carExists.specifications === undefined || carExists.specifications.length === 0) {
      throw new CustomError(404, "Specification's Car does not exist!");
    }

    carExists.specifications = [];

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { DeleteCarSpecificationsUseCase };
