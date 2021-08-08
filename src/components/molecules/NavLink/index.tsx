import { Icons } from "../../../@types/icons"
import { Button } from "../../atoms"

import "./index.scss"

export type NavLinkProps = {
   name: string
   icon: Icons
   path: string
}

const NavLink: React.FC<NavLinkProps> = ({ name, icon, path }) => {
   const handleClick = () => {}

   return (
      <div className={`nav-link ${false ? "active" : ""}`}>
         <Button appareance="nav" icon={icon} onClick={handleClick} />
         <Button className="btn-name" appareance="nav" onClick={handleClick}>
            {name}
         </Button>
      </div>
   )
}

export default NavLink
