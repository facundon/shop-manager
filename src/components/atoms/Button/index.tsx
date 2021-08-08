import React, { ButtonHTMLAttributes } from "react"
import Icon from "../Icon"
import Loader from "../Loader"

import { Icons } from "../../../@types/icons"

import "./index.scss"

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   icon?: Icons
   appareance?:
      | "primary"
      | "secondary"
      | "subtle"
      | "minimalist"
      | "link"
      | "nav"
   circle?: boolean
   iconColor?: string
   size?: "sm" | "md"
   disabled?: boolean
   loading?: boolean
   loadingText?: string
}

const Button = ({
   children,
   icon,
   iconColor,
   loadingText,
   appareance = "primary",
   size = "sm",
   circle = false,
   disabled = false,
   loading = false,
   ...props
}: BtnProps) => {
   return (
      <div
         className={`btn-wrapper ${
            disabled || loading ? "disabled" : ""
         } ${appareance} ${size} ${circle && "circle"} ${
            children && "with-text"
         }`}
         tabIndex={0}
      >
         <button {...props} tabIndex={-1} disabled={disabled || loading}>
            {loading ? (
               <Loader text={loadingText} orientation="row" />
            ) : (
               <>
                  {icon && <Icon name={icon} />}
                  {children}
               </>
            )}
         </button>
      </div>
   )
}

export default Button
