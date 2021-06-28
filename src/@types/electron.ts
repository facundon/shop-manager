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
} from "../../electron/@types/api"
import { Customer } from "../../electron/db/entity/Customer"

declare global {
   interface Window {
      electron: {
         customer: {
            insert: (props: InsertCustomerProps) => Promise<number | Error>
            delete: (props: DeleteCustomerProps) => Promise<null | Error>
            update: (props: UpdateCustomerProps) => Promise<null | Error>
            getAll: () => Promise<Customer[] | Error>
         }
         order: {
            insert: (
               props: InsertOrderProps
            ) => Promise<{ id: number; price: number } | Error>
            update: (props: UpdateOrderProps) => Promise<number | Error>
         }
         product: {
            insert: (props: InsertProductProps) => Promise<number | Error>
            delete: (props: DeleteProductProps) => Promise<null | Error>
            update: (props: UpdateProductProps) => Promise<null | Error>
         }
         rawMaterial: {
            insert: (props: InsertRawMaterialProps) => Promise<number | Error>
            delete: (props: DeleteRawMaterialProps) => Promise<null | Error>
            update: (props: UpdateRawMaterialProps) => Promise<null | Error>
         }
      }
   }
}
