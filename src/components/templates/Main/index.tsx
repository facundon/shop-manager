import "./index.scss"

type MainProps = {
   sideNav: React.ReactElement
}

const Main: React.FC<MainProps> = ({ sideNav }) => {
   return <div className="container">{sideNav}</div>
}

export default Main
