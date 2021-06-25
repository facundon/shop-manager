import { Gender, OrderStatus } from "../../@types/entities"
import {
   BaseEntity,
   Column,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
} from "typeorm"
import { Order } from "./Order"

@Entity("customers")
export class Customer extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number

   @Column()
   name!: string

   @Column()
   age!: number

   @Column({ type: "simple-enum", enum: Gender })
   gender!: Gender

   @OneToMany(() => Order, order => order.customer)
   orders!: Order[]

   getTotalSpent() {
      let total = 0
      this.orders.forEach(order => {
         if (order.status !== OrderStatus.Canceled) {
            total += order.price
         }
      })
      return total
   }
}
