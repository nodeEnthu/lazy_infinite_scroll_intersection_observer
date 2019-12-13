import "../styles/styles.scss";
import Header from "./Header";

const Layout  = ({children}) => {
  return (
    <div className = "layout">
      <Header/>
      { children }
    </div>
  )
}

export default Layout;