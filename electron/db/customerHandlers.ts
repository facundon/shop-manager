import { ipcMain } from "electron"
import { Customer, Gender } from "./entity/Customer"

export default function setCustomerHandlers() {
   ipcMain.handle(
      "insert-customer",
      async (_, name: string, age: number, gender: Gender) => {
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
      }
   )
   ipcMain.handle("delete-customer", async (_, id: number) => {
      try {
         const customer = await Customer.findOneOrFail(id)
         await customer.remove()
         return null
      } catch (error) {
         console.error(error)
         return error
      }
   })
   ipcMain.handle(
      "update-customer",
      async (
         _,
         id: number,
         { name, age, gender }: { name?: string; age?: number; gender?: Gender }
      ) => {
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
      }
   )
}
