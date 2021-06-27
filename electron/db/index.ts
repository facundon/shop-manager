import { createConnection } from "typeorm"
import setOrderHandlers from "./handlers/orderHandlers"
import setCustomerHandlers from "./handlers/customerHandlers"
import setProductHandlers from "./handlers/productHandlers"
import setRawMaterialHandlers from "./handlers/rawMaterialHandlers"

createConnection().then(connection => {
   connection.synchronize()
   setOrderHandlers()
   setCustomerHandlers()
   setProductHandlers()
   setRawMaterialHandlers()
})
