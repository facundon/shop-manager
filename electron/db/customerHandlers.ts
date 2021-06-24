import {
   DeleteCustomerProps,
   InsertCustomerProps,
   UpdateCustomerProps,
} from "../@types/api"
import { ipcMain } from "electron"
import { Customer } from "./entity/Customer"

export default function setCustomerHandlers() {
   ipcMain.handle("insert-customer", async (_, props: InsertCustomerProps) => {
      const { name, age, gender } = props
      try {
         const YOB = new Date().getFullYear() - age
         const exists = await Customer.findOne({ name, age: YOB })
         if (exists) return Error("Customer already exists")

         const customer = new Customer()
         customer.name = name
         customer.age = YOB
         customer.gender = gender
         await customer.save()
         return customer.id
      } catch (error) {
         console.error(error)
         return error
      }
   })
   ipcMain.handle("delete-customer", async (_, props: DeleteCustomerProps) => {
      const { id } = props
      try {
         const customer = await Customer.findOneOrFail(id)
         await customer.remove()
         return null
      } catch (error) {
         console.error(error)
         return error
      }
   })
   ipcMain.handle("update-customer", async (_, props: UpdateCustomerProps) => {
      const { id, name, age, gender } = props
      try {
         const customer = await Customer.findOneOrFail(id)
         if (name) customer.name = name
         if (age) customer.age = age
         if (gender) customer.gender = gender
         await customer.save()
         return null
      } catch (error) {
         console.error(error)
         return error
      }
   })
}
