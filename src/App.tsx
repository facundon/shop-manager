import { useState } from "react"
import { Gender, OrderStatus } from "../electron/@types/entities"

function App() {
   const [rawId, setRawId] = useState(0)
   const addCustomer = async () => {
      const customer = await window.electron.customer.insert({
         name: "Facu7",
         age: 26,
         gender: Gender.Male,
      })
      const rawMat = await window.electron.rawMaterial.insert({
         name: "Fabric4",
         price: 25,
      })
      if (typeof rawMat === "number") {
         setRawId(rawMat)
         const prod = await window.electron.product.insert({
            name: "almoadon4",
            profit: 100,
            variant: "azul",
            rawMaterialsIds: [rawMat],
         })
         console.log("customer:", customer, "product:", prod)
         if (typeof customer === "number" && typeof prod === "number") {
            const order = await window.electron.order.insert({
               customerId: customer,
               discount: 5,
               productsIds: [prod],
               status: OrderStatus.Pending,
            })
            console.log(order)
         }
      }
   }
   const updatePrice = async () => {
      await window.electron.product.update({ id: 1, profit: 200 })
   }
   return (
      <div className="App">
         <p>
            Edit <code>src/App.tsx</code> and save to reload.
         </p>
         <button onClick={addCustomer}>Add Customer</button>
         <button onClick={updatePrice}>Update price</button>
      </div>
   )
}

export default App
