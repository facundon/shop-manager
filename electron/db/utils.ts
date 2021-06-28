import { Raise } from "./entity/Raise"
import { Product } from "./entity/Product"
import { RawMaterial } from "./entity/RawMaterial"

export async function registerRaise(
   item: RawMaterial | Product,
   newPrice: number
) {
   try {
      const raise = new Raise()
      raise.oldPrice = item.price
      raise.newPrice = newPrice
      raise.percent = (raise.newPrice / raise.oldPrice - 1) * 100
      raise.item = item
      raise.type = item.type
      await raise.save()
   } catch (err) {
      throw err
   }
}

export function getProductPrice(rawMaterials: RawMaterial[], profit: number) {
   let newPrice = 0
   rawMaterials.forEach(material => {
      newPrice += material.price
   })
   return newPrice + newPrice * (profit / 100)
}

export function getOrderPrice(products: Product[], discount: number) {
   let total = 0
   products.forEach(product => {
      total += product.price
   })
   return total - (total * discount) / 100
}
