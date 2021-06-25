import { Gender, OrderStatus } from "./entities"

export type InsertCustomerProps = {
   name: string
   age: number
   gender: Gender
}

export type DeleteCustomerProps = {
   id: number
}

export type UpdateCustomerProps = {
   id: number
} & Partial<InsertCustomerProps>

export type InsertOrderProps = {
   status: OrderStatus
   discount: number
   customerId: number
   productsIds: number[]
}

export type UpdateOrderProps = {
   id: number
} & Partial<InsertOrderProps>

export type InsertProductProps = {
   name: string
   variant: string
   rawMaterialsIds: number[]
   profit: number
}

export type DeleteProductProps = {
   id: number
}

export type UpdateProductProps = {
   id: number
} & Partial<InsertProductProps>

export type InsertRawMaterialProps = {
   name: string
   price: number
}

export type DeleteRawMaterialProps = {
   id: number
}

export type UpdateRawMaterialProps = {
   id: number
} & Partial<InsertRawMaterialProps>
