import {
   BaseEntity,
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
   type!: string

   @Column()
   percent!: number

   @Column()
   oldPrice!: number

   @Column()
   newPrice!: number
}
