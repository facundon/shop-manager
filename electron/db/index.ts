import { createConnection } from "typeorm"
import setOrderHandlers from "./orderHandlers"
import setCustomerHandlers from "./customerHandlers"
import setProductHandlers from "./productHandlers"
import setRawMaterialHandlers from "./rawMaterialHandlers"

createConnection().then(connection => {
   connection.synchronize()
   setOrderHandlers()
   setCustomerHandlers()
   setProductHandlers()
   setRawMaterialHandlers()
})
