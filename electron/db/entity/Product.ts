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

   @ManyToMany(() => RawMaterial)
   @JoinTable()
   rawMaterials!: RawMaterial[]

   @Column()
   profit!: number

   @OneToMany(() => Raise, raise => raise.item)
   raises!: Raise[]

   getPrice() {
      let newPrice = 0
      this.rawMaterials.forEach(material => {
         newPrice += material.price
      })
      return newPrice * (this.profit / 100)
   }
}
