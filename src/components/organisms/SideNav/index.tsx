import NavLink, { NavLinkProps } from "../../molecules/NavLink"
import "./index.scss"

type SideNavProps = {
   options: NavLinkProps[]
   active: number
}

const SideNav: React.FC<SideNavProps> = ({ options, active }) => {
   return (
      <nav className="side-nav">
         <ul>
            {options.map((option, i) => (
               <li key={i}>
                  <NavLink
                     name={option.name}
                     icon={option.icon}
                     path={option.path}
                  />
               </li>
            ))}
         </ul>
      </nav>
   )
}

export default SideNav
