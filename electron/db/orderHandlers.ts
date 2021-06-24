import { ipcMain } from "electron"
import { Customer } from "./entity/Customer"
import { Order, OrderStatus } from "./entity/Order"
import { Product } from "./entity/Product"

export default function setOrderHandlers() {
   ipcMain.handle(
      "insert-order",
      async (
         _,
         status: OrderStatus,
         discount: number,
         customerId: number,
         productsIds: number[]
      ) => {
         try {
            const order = new Order()
            order.status = status
            order.discount = discount
            const customer = await Customer.findOneOrFail({ id: customerId })
            order.customer = customer
            const products = await Product.findByIds(productsIds)
            order.products = products
            order.save()
            return order.price
         } catch (error) {
            console.error(error)
            return error
         }
      }
   )
   ipcMain.handle(
      "update-order",
      async (
         _,
         id,
         {
            status,
            discount,
            customerId,
            productsIds,
         }: {
            status?: OrderStatus
            discount?: number
            customerId?: number
            productsIds?: number[]
         }
      ) => {
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
      }
   )
}
