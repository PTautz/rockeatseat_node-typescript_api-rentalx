import { Repository, getRepository, DeleteResult } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async delete(license_plate: string): Promise<DeleteResult> {
    const carDeletedResult = await this.repository.delete({ license_plate });
    return carDeletedResult;
  }

  // Delete usando raw query
  // async delete(license_plate: string): Promise<DeleteResult> {
  //   const carDeletedResult = await this.repository.query("DELETE FROM cars WHERE license_plate = $1", [license_plate]);
  //   return carDeletedResult;
  // }

  // QueryBulder
  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder("cars").where("available = :available", { available: true });

    // ILIKE para pesquisa desconsiderando maiúsculas e minúsculas
    if (brand) {
      const brandLike = `%${brand}%`;
      carsQuery.andWhere("cars.brand ILIKE :brand", { brand: brandLike });
    }

    if (category_id) {
      const categoryIdLike = `%${category_id}%`;
      carsQuery.andWhere("cars.category_id ILIKE :category_id", { category_id: categoryIdLike });
    }

    if (name) {
      const nameLike = `%${name}%`;
      carsQuery.andWhere("cars.name ILIKE :name", { name: nameLike });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    // quando é o id pode ir pelo finOne direto
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    await this.repository.createQueryBuilder().update().set({ available }).where("id = :id").setParameters({ id }).execute();
  }
  // Update cars set available = 'true' where id = id
}
export { CarsRepository };
