import { DeleteResult } from "typeorm";
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car>;
  delete(license_plate: string): Promise<DeleteResult>;
  create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car>;
  findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailability(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
