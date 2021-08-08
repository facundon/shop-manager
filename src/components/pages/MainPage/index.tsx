import { Icons } from "../../../@types/icons"
import { SideNav } from "../../organisms"
import { Main } from "../../templates"

const options: { name: string; icon: Icons; path: string }[] = [
   {
      name: "Customers",
      icon: "users-book",
      path: "/customers",
   },
   { name: "Products", icon: "shopping-bag", path: "/products" },
]

const MainPage = () => {
   const sideNav = <SideNav options={options}></SideNav>

   return <Main sideNav={sideNav} />
}

export default MainPage
