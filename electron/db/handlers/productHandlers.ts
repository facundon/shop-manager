import { ipcMain } from "electron"
import { Product } from "../entity/Product"
import { RawMaterial } from "../entity/RawMaterial"

import {
   DeleteProductProps,
   InsertProductProps,
   UpdateProductProps,
} from "../../@types/api"
import { getProductPrice, registerRaise } from "../utils"

export default function setProductHandlers() {
   ipcMain.handle("insert-product", async (_, props: InsertProductProps) => {
      const { name, profit, variant, rawMaterialsIds } = props
      try {
         const exists = await Product.findOne({ name, variant })
         if (exists) return Error("Product already exists")

         const product = new Product()
         product.name = name
         product.variant = variant
         product.profit = profit
         const rawMaterials = await RawMaterial.findByIds(rawMaterialsIds)
         product.rawMaterials = rawMaterials
         product.price = getProductPrice(rawMaterials, profit)

         await product.save()
         return product.id
      } catch (error) {
         console.error(error)
         return error
      }
   })
   ipcMain.handle("delete-product", async (_, props: DeleteProductProps) => {
      const { id } = props
      try {
         const product = await Product.findOneOrFail(id)
         await product.remove()
         return null
      } catch (error) {
         console.error(error)
         return error
      }
   })
   ipcMain.handle("update-product", async (_, props: UpdateProductProps) => {
      const { id, name, variant, profit, rawMaterialsIds } = props
      try {
         const product = await Product.findOneOrFail(id, {
            relations: ["rawMaterials"],
         })
         if (name) product.name = name
         if (variant) product.variant = variant
         if (profit) product.profit = profit
         if (rawMaterialsIds) {
            const newMaterials = await RawMaterial.findByIds(rawMaterialsIds, {
               relations: ["products"],
            })
            product.rawMaterials = newMaterials
         }
         if (profit || rawMaterialsIds) {
            const newPrice = getProductPrice(
               product.rawMaterials,
               product.profit
            )
            if (newPrice !== product.price) {
               await registerRaise(product, newPrice)
               product.price = newPrice
            }
         }
         await product.save()
         return null
      } catch (error) {
         console.error(error)
         return error
      }
   })
}
