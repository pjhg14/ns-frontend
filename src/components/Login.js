import { useContext, useState } from 'react'
import { Button, Form, Message, Input } from 'semantic-ui-react'
import { UserContext } from './App'
import { useHistory } from "react-router-dom";

function Login(){
  const user = useContext(UserContext)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail2, setUserEmail2] = useState("")
  const [toggle, setToggle] = useState(true)
  const history = useHistory()

  function handleLogin(event) {
    event.preventDefault()
    
    // do stuff
    fetch(`http://localhost:9292/users/login/${userEmail}`)
      .then((resp) => resp.json())
      .then(queriedUser => {
        // console.log(queriedUser)
        user.set(queriedUser)
        history.push("/groups")
      })
  }

  function handleSignUp(event) {
    event.preventDefault()

    const toAdd = {
      name: userName,
      email: userEmail2
    }

    fetch("http://localhost:9292/users/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toAdd),
    })
      .then((resp) => resp.json())
      .then(newUser => {
        user.set(newUser)
        console.log(newUser)
        history.push("/groups")
      })
  }

  return(
    <div>
      <h2>{toggle ? "Login" : "Sign-up"}</h2>
      {toggle ?
        (<Form onSubmit={handleLogin} >
          <label htmlFor="useremail" className="label">Your Email</label>
          <Input className="input" id="useremail" value={userEmail} 
            onChange={e => setUserEmail(e.target.value)} type="text" placeholder="Your Email"></Input>
          <Button>Submit</Button>
        </Form>)
      :
        (<Form onSubmit={handleSignUp} >
          <label htmlFor="username" className="label">Your Name</label>
          <Input className="input" id="username" value={userName} 
            onChange={e => setUserName(e.target.value)} type="text" placeholder="Your Name"></Input>
          <label htmlFor="useremail" className="label">Your Email</label>
          <Input className="input" id="useremail" value={userEmail2} 
            onChange={e => setUserEmail2(e.target.value)} type="text" placeholder="Your Email"></Input>
          <Button>Submit</Button>
        </Form>)
      }
      <Button onClick={() => setToggle(!toggle)}>{toggle ? "Sign-up" : "Login"}</Button>
    </div>
  )
}

export default Login