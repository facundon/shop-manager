import { ipcMain } from "electron"
import { RawMaterial } from "../entity/RawMaterial"
import { registerRaise } from "../utils"

import {
   DeleteRawMaterialProps,
   InsertRawMaterialProps,
   UpdateRawMaterialProps,
} from "../../@types/api"

export default function setRawMaterialHandlers() {
   ipcMain.handle(
      "insert-raw-material",
      async (_, props: InsertRawMaterialProps) => {
         const { name, price } = props
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
   ipcMain.handle(
      "delete-raw-material",
      async (_, props: DeleteRawMaterialProps) => {
         const { id } = props
         try {
            const rawMaterial = await RawMaterial.findOneOrFail(id)
            await rawMaterial.remove()
            return null
         } catch (error) {
            console.error(error)
            return error
         }
      }
   )
   ipcMain.handle(
      "update-raw-material",
      async (_, props: UpdateRawMaterialProps) => {
         const { id, name, price } = props
         try {
            const rawMaterial = await RawMaterial.findOneOrFail(id)
            if (name) rawMaterial.name = name
            if (price && price !== rawMaterial.price) {
               await registerRaise(rawMaterial, price)
               rawMaterial.price = price
            }
            await rawMaterial.save()
            return null
         } catch (error) {
            console.error(error)
            return error
         }
      }
   )
}
