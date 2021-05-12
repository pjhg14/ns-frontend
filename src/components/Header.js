import {NavLink} from "react-router-dom"
import {useHistory} from "react-router-dom"

function Header(){
 
  const history = useHistory()

  function handleHomeClick(){
    history.push("/")
}

  return(
    <div className="header">
    <h1 onClick={handleHomeClick}>NerdSpace</h1>
    <nav>
      <NavLink className="button" to="/comics">Comics</NavLink>
      <NavLink className="button" to="/groups">Groups</NavLink>
      <NavLink className="button" to="/addComic">Add a Comic</NavLink>
    </nav>
  </div>
  )
}

export default Header