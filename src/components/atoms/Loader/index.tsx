import "./index.scss"

const Loader = ({
   text,
   height,
   orientation = "column",
}: {
   text?: string
   height?: string
   orientation?: "row" | "column"
}) => {
   return (
      <div className={`loader-wrapper ${orientation}`} style={{ height }}>
         {text && <p>{text}</p>}
         <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
         </div>
      </div>
   )
}

export default Loader