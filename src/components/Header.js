import { NavLink } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { UserContext } from "./App"
import { useContext } from 'react'
import { Icon, Popup } from "semantic-ui-react"

function Header(){
  const user = useContext(UserContext)
  const history = useHistory()

  function handleHomeClick(){
    history.push("/")
  }

  function handleLogOff() {
    user.set({id: -1, name: "Guest"})
    history.push("/")
  }

  return(
    <div className="header">
      <h1 onClick={handleHomeClick}>NerdSpace</h1>
      <div id='navContainer'>
        <div id="filler"></div>
        <div id="links">
          <nav>
            <NavLink className="button" to="/groups">Threads</NavLink>
            <NavLink className="button" to="/comics">Comics</NavLink>
            <NavLink className="button" to="/addComic">Add a Comic</NavLink>
          </nav>
        </div>
        <div id="userNameBar">
          {user.get.id !== -1 && 
            <p>
              Welcome, {user.get.name} 
              <Popup header="Log Off" size="small" trigger={<Icon name="power off" onClick={handleLogOff}/>} />
            </p>
          }
        </div>
      </div>
    </div>
  )
}

export default Header