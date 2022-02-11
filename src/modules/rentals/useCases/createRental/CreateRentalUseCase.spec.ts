import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CustomError } from "@shared/errors/CustomError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

// importações
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Description test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      brand: "Brand test",
      category_id: "1234",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "654321",
      expected_return_date: dayAdd24Hours,
    });

    // console.log(`Retorno de rental: ${rental}`);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another rent open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "123456",
      user_id: "Donatello",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "123456",
        user_id: "Jojoca",
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new CustomError(409, "Car is unavailable!"));
  });

  it("should not be able to create a new rental if there is another rent open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "salsicha's car",
      user_id: "654321",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "batmovel",
        user_id: "654321",
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(new CustomError(409, "There is a rent in progress for this user."));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "123456",
        user_id: "654321",
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new CustomError(409, "Invalid return time - Minimum expected rental date is 24 hours !"));
  });
});
