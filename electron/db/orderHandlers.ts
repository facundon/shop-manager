import { InsertOrderProps, UpdateOrderProps } from "../@types/api"
import { ipcMain } from "electron"
import { Customer } from "./entity/Customer"
import { Order } from "./entity/Order"
import { Product } from "./entity/Product"

export default function setOrderHandlers() {
   ipcMain.handle("insert-order", async (_, props: InsertOrderProps) => {
      const { status, discount, customerId, productsIds } = props
      try {
         const order = new Order()
         order.status = status
         order.discount = discount
         const customer = await Customer.findOneOrFail({ id: customerId })
         order.customer = customer
         const products = await Product.findByIds(productsIds)
         order.products = products
         order.save()
         return { id: order.id, price: order.price }
      } catch (error) {
         console.error(error)
         return error
      }
   })
   ipcMain.handle("update-order", async (_, props: UpdateOrderProps) => {
      const { id, customerId, status, discount, productsIds } = props
      try {
         const order = await Order.findOneOrFail(id)
         if (status) order.status = status
         if (discount) order.discount = discount
         if (customerId) {
            const customer = await Customer.findOneOrFail({ id: customerId })
            order.customer = customer
         }
         if (productsIds) {
            const products = await Product.findByIds(productsIds)
            order.products = products
         }
         order.save()
         return order.price
      } catch (error) {
         console.error(error)
         return error
      }
   })
}
