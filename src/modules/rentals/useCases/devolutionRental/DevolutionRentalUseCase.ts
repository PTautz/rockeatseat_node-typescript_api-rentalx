import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { CustomError } from "@shared/errors/CustomError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const minimum_daily = 1;

    if (!rental) {
      throw new CustomError(404, "Rental does not exist");
    }

    // verificar tempo de aluguel
    const car = await this.carsRepository.findById(rental.car_id);

    const dateNow = this.dateProvider.dateNow();

    // quantas diárias tem o aluguel
    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    // entrega do carro em menos de 24 h recebe o valor mínimo de diária
    if (daily <= 0) {
      daily = minimum_daily;
    }

    // checagem de dias de atraso
    const delayFinalRentalDate = this.dateProvider.compareInDays(rental.expected_return_date, dateNow);

    let total = 0;

    // cálculo da multa
    if (delayFinalRentalDate > 0) {
      const calculate_fine = delayFinalRentalDate * car.fine_amount;
      total = calculate_fine;
    }

    // calculo diária
    // total = total + daily * car.daily_rate;
    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    // update rental
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailability(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
