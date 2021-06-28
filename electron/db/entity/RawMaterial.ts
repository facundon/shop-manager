import {
   BaseEntity,
   Column,
   Entity,
   ManyToMany,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm"
import { Product } from "./Product"
import { Raise } from "./Raise"

@Entity("raw_materials")
export class RawMaterial extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number

   @Column()
   name!: string

   @Column()
   price!: number

   @OneToMany(() => Raise, raise => raise.item)
   raises!: Raise[]

   @ManyToMany(() => Product, product => product.rawMaterials)
   products!: Product[]

   type = "Raw Material"
}
