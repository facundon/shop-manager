import { ipcMain } from "electron"
import { RawMaterial } from "./entity/RawMaterial"

export default function setRawMaterialHandlers() {
   ipcMain.handle(
      "insert-raw-material",
      async (_, name: string, price: number) => {
         try {
            const exists = await RawMaterial.findOne({ name })
            if (exists) return Error("Raw material already exists")

            const rawMaterial = new RawMaterial()
            rawMaterial.name = name
            rawMaterial.price = price
            await rawMaterial.save()
            return rawMaterial.id
         } catch (error) {
            console.error(error)
            return error
         }
      }
   )
   ipcMain.handle("delete-raw-material", async (_, id: number) => {
      try {
         const rawMaterial = await RawMaterial.findOneOrFail(id)
         await rawMaterial.remove()
         return null
      } catch (error) {
         console.error(error)
         return error
      }
   })
   ipcMain.handle(
      "update-raw-material",
      async (
         _,
         id: number,
         { name, price }: { name?: string; price?: number }
      ) => {
         try {
            const rawMaterial = await RawMaterial.findOneOrFail(id)
            if (name) rawMaterial.name = name
            if (price) rawMaterial.price = price
            await rawMaterial.save()
            return null
         } catch (error) {
            console.error(error)
            return error
         }
      }
   )
}
