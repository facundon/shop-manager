import { ipcMain } from "electron"
import { Product } from "./entity/Product"
import { RawMaterial } from "./entity/RawMaterial"

export default function setProductHandlers() {
   ipcMain.handle(
      "insert-product",
      async (
         _,
         name: string,
         variant: string,
         profit: number,
         rawMaterialsIds: number[]
      ) => {
         try {
            const exists = await Product.findOne({ name, variant })
            if (exists) return Error("Product already exists")

            const product = new Product()
            product.name = name
            product.variant = variant
            product.profit = profit
            const rawMaterials = await RawMaterial.findByIds(rawMaterialsIds)
            product.rawMaterials = rawMaterials
            await product.save()
            return product.id
         } catch (error) {
            console.error(error)
            return error
         }
      }
   )
   ipcMain.handle("delete-product", async (_, id: number) => {
      try {
         const product = await Product.findOneOrFail(id)
         await product.remove()
         return null
      } catch (error) {
         console.error(error)
         return error
      }
   })
   ipcMain.handle(
      "update-product",
      async (
         _,
         id: number,
         {
            name,
            variant,
            profit,
            rawMaterialsIds,
         }: {
            name?: string
            variant?: string
            profit?: number
            rawMaterialsIds?: number[]
         }
      ) => {
         try {
            const product = await Product.findOneOrFail(id)
            if (name) product.name = name
            if (variant) product.variant = variant
            if (profit) product.profit = profit
            if (rawMaterialsIds) {
               const newMaterials = await RawMaterial.findByIds(rawMaterialsIds)
               product.rawMaterials = newMaterials
            }
            await product.save()
            return null
         } catch (error) {
            console.error(error)
            return error
         }
      }
   )
}
