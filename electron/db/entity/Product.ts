import {
   BaseEntity,
   Column,
   Entity,
   JoinTable,
   ManyToMany,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm"
import { Raise } from "./Raise"
import { RawMaterial } from "./RawMaterial"

@Entity("products")
export class Product extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number

   @Column()
   name!: string

   @Column()
   variant!: string

   @ManyToMany(() => RawMaterial, rawMaterial => rawMaterial.products)
   @JoinTable()
   rawMaterials!: RawMaterial[]

   @Column()
   profit!: number

   @OneToMany(() => Raise, raise => raise.item)
   raises!: Raise[]

   @Column()
   price!: number

   type = "Product"
}
