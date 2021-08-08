import { useEffect, useState, FC, SVGProps } from "react"
import { Icons } from "../../../@types/icons"

type IconProps = {
   name: Icons
}

const Icon: FC<IconProps> = props => {
   const { name, ...otherProps } = props
   const [iconModule, setIconModule] = useState<FC<SVGProps<SVGSVGElement>>>()

   useEffect(() => {
      import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../../../icons/${name}.svg`)
         .then(module => {
            setIconModule(module.default)
         })
         .catch(error => {
            console.error(`Icon with name: ${name} not found!`)
            console.error(error.message)
         })
   }, [name])

   const renderIcon = () => {
      if (!iconModule) return null
      const Component = iconModule
      return <Component {...otherProps} />
   }

   return <>{renderIcon()}</>
}
export default Icon
