import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { CustomError } from "@shared/errors/CustomError";

interface IRequest {
  user_id: string;
  car_id: string;
  // start_date e end_date serão gerados pela aplicação
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimumHours = 24;

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new CustomError(409, "Car is unavailable!");
    }

    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
    const userWithOpenRent = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (userWithOpenRent) {
      throw new CustomError(409, "There is a rent in progress for this user.");
    }

    // O aluguel deve ter duração mínima de 24 horas
    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHours) {
      throw new CustomError(409, "Invalid return time - Minimum expected rental date is 24 hours !");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailability(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
