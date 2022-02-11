import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { CustomError } from "@shared/errors/CustomError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Should be able to add a new specification to the car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });

  it("should not be able to add a specification to a non-existent car", async () => {
    const car_id = "123";
    const specification_id = ["54321"];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specification_id,
      }),
    ).rejects.toEqual(new CustomError(404, "Car does not exist!"));
  });

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car brand",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "Specifications' name",
      description: "Specifications' description",
    });

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id: [specification.id],
    });

    expect(carSpecifications).toHaveProperty("specifications");
    expect(carSpecifications.specifications.length).toBe(1);
  });
});
