import { contextBridge, ipcRenderer } from "electron"

import {
   DeleteCustomerProps,
   DeleteProductProps,
   DeleteRawMaterialProps,
   InsertCustomerProps,
   InsertOrderProps,
   InsertProductProps,
   InsertRawMaterialProps,
   UpdateCustomerProps,
   UpdateOrderProps,
   UpdateProductProps,
   UpdateRawMaterialProps,
} from "./@types/api"

contextBridge.exposeInMainWorld("electron", {
   customer: {
      async insert(props: InsertCustomerProps) {
         return await ipcRenderer.invoke("insert-customer", props)
      },
      async delete(props: DeleteCustomerProps) {
         return await ipcRenderer.invoke("delete-customer", props)
      },
      async update(props: UpdateCustomerProps) {
         return await ipcRenderer.invoke("update-customer", props)
      },
   },
   order: {
      async insert(props: InsertOrderProps) {
         return await ipcRenderer.invoke("insert-order", props)
      },
      async update(props: UpdateOrderProps) {
         return await ipcRenderer.invoke("update-order", props)
      },
   },
   product: {
      async insert(props: InsertProductProps) {
         return await ipcRenderer.invoke("insert-product", props)
      },
      async delete(props: DeleteProductProps) {
         return await ipcRenderer.invoke("delete-product", props)
      },
      async update(props: UpdateProductProps) {
         return await ipcRenderer.invoke("update-product", props)
      },
   },
   rawMaterial: {
      async insert(props: InsertRawMaterialProps) {
         return await ipcRenderer.invoke("insert-raw-material", props)
      },
      async delete(props: DeleteRawMaterialProps) {
         return await ipcRenderer.invoke("delete-raw-material", props)
      },
      async update(props: UpdateRawMaterialProps) {
         return await ipcRenderer.invoke("update-raw-material", props)
      },
   },
})
