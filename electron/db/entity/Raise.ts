import {
   AfterInsert,
   BaseEntity,
   BeforeInsert,
   Column,
   CreateDateColumn,
   Entity,
   ManyToOne,
   PrimaryGeneratedColumn,
} from "typeorm"
import { Product } from "./Product"
import { RawMaterial } from "./RawMaterial"

@Entity("raises")
export class Raise extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number

   @ManyToOne(() => Product && RawMaterial, item => item.raises)
   item!: Product | RawMaterial

   @CreateDateColumn()
   date!: Date

   @Column()
   percent!: number

   @Column()
   oldPrice!: number

   @Column()
   newPrice!: number

   @BeforeInsert()
   getOldPrice() {
      this.oldPrice =
         this.item instanceof Product ? this.item.getPrice() : this.item.price
   }

   @AfterInsert()
   getNewPrice() {
      this.newPrice =
         this.item instanceof Product ? this.item.getPrice() : this.item.price
      this.percent = (this.newPrice / this.oldPrice - 1) * 100
   }
}
