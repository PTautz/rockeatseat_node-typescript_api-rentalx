import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

import { v4 as uuidv4 } from "uuid";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  // quanto usando tabela de relacionamentos é ManytoMany
  @ManyToMany(() => Specification, { eager: true })
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }], // Campo na tabela que possuí a chave estrangeira da tabela em que estamos (referencia)
    inverseJoinColumns: [{ name: "specification_id" }], // outra coluna que referencia a tabela das entidades associativas
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
      this.created_at = new Date();
    }
  }
}

export { Car };
