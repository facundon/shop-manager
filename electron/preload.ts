import { contextBridge, ipcRenderer } from "electron"
import { OrderStatus } from "./db/entity/Order"
import { Gender } from "./db/entity/Customer"

contextBridge.exposeInMainWorld("electron", {
   customer: {
      async insert(name: string, age: number, gender: Gender) {
         return await ipcRenderer.invoke("insert-customer", name, age, gender)
      },
      async delete(id: number) {
         return await ipcRenderer.invoke("delete-customer", id)
      },
      async update(
         id: number,
         data: { name?: string; age?: number; gender?: Gender }
      ) {
         return await ipcRenderer.invoke("update-customer", id, data)
      },
   },
   order: {
      async insert(
         status: OrderStatus,
         discount: number,
         customerId: number,
         productsIds: number[]
      ) {
         return await ipcRenderer.invoke(
            "insert-order",
            status,
            discount,
            customerId,
            productsIds
         )
      },
      async update(
         id: string,
         data: {
            status?: OrderStatus
            discount?: number
            customerId?: number
            productsIds?: number[]
         }
      ) {
         return await ipcRenderer.invoke("update-order", id, data)
      },
   },
   product: {
      async insert(
         name: string,
         variant: string,
         rawMaterialsIds: number[],
         profit: number
      ) {
         return await ipcRenderer.invoke(
            "insert-product",
            name,
            variant,
            profit,
            rawMaterialsIds
         )
      },
      async delete(id: number) {
         return await ipcRenderer.invoke("delete-product", id)
      },
      async update(
         id: number,
         data: {
            name?: string
            variant?: string
            profit?: number
            rawMaterialsIds?: number[]
         }
      ) {
         return await ipcRenderer.invoke("update-product", id, data)
      },
   },
   rawMaterial: {
      async insert(name: string, price: number) {
         return await ipcRenderer.invoke("insert-raw-material", name, price)
      },
      async delete(id: number) {
         return await ipcRenderer.invoke("delete-raw-material", id)
      },
      async update(id: number, data: { name?: string; price?: number }) {
         return await ipcRenderer.invoke("update-raw-material", id, data)
      },
   },
})
