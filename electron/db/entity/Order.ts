import { OrderStatus } from "../../@types/entities"
import {
   BaseEntity,
   Column,
   Entity,
   JoinTable,
   ManyToMany,
   ManyToOne,
   PrimaryGeneratedColumn,
} from "typeorm"
import { Customer } from "./Customer"
import { Product } from "./Product"

@Entity("orders")
export class Order extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number

   @ManyToMany(() => Product)
   @JoinTable()
   products!: Product[]

   @ManyToOne(() => Customer, customer => customer.orders)
   customer!: Customer

   @Column("simple-enum", { enum: OrderStatus })
   status!: OrderStatus

   @Column({ default: 0 })
   discount!: number

   @Column()
   price!: number
}
