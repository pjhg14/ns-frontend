import { useContext, useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import { UserContext } from './App'
import { useHistory } from "react-router-dom";
import { userURL } from '../util/links';

function LoginPage(){
  const user = useContext(UserContext)
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail2, setUserEmail2] = useState("")
  const [toggle, setToggle] = useState(true)
  const [userError, setUserError] = useState("")
  const history = useHistory()

  function handleLogin(event) {
    event.preventDefault()
    
  
    fetch(`${userURL}/login/${userEmail}`)
      .then(resp => {
        if (resp.status >= 200 && resp.status <=299)
          return resp.json()
        else if (resp.status === 404)
          throw Error("You don't seem to have an account. Please create one.")
        else
          throw Error("Something came up, please try again later...")
        })
      .then(queriedUser => {
        user.set(queriedUser)
        history.push("/groups")
      })
      .catch(error => {
        console.log(error.message)
        setUserEmail("")
        setUserError(error.message)
      })
  }

  function handleSignUp(event) {
    event.preventDefault()

    const toAdd = {
      name: userName,
      email: userEmail2
    }

    fetch(`${userURL}/sign_up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toAdd),
    })
      .then(resp => resp.json())
      .then(newUser => {
        user.set(newUser)
        console.log(newUser)
        history.push("/groups")
      })
  }

  return(
    <div>
      <h2>Welcome</h2>
      <p className="welcomeText">Nerdspace is a place for you to gather with your fellow nerds and talk about the things you want. Sign up to join our thread board, as well as review all the Nerdy things we have to offer!</p>
      <p className="welcomeText" style={{color:"red"}}>{userError}</p>
      {toggle ? (
        <Form onSubmit={handleLogin} >
          <label htmlFor="useremail" className="label">Your Email</label>
          <Input className="input" id="useremail" value={userEmail} 
            onChange={e => setUserEmail(e.target.value)} type="text" placeholder="Your Email"></Input>
          <Button>Login</Button>
        </Form>
      ) : (
        <Form onSubmit={handleSignUp} >
          <label htmlFor="username" className="label">Your Name</label>
          <Input className="input" id="username" value={userName} 
            onChange={e => setUserName(e.target.value)} type="text" placeholder="Your Name"></Input>
          <label htmlFor="useremail" className="label">Your Email</label>
          <Input className="input" id="useremail" value={userEmail2} 
            onChange={e => setUserEmail2(e.target.value)} type="text" placeholder="Your Email"></Input>
          <Button>Sign Up</Button>
        </Form>
      )}
      <div id="toggle">
      <p id="loginText">{toggle ? "Not a User?" : "Already a User?"}</p>
      <Button onClick={() => setToggle(!toggle)}>{toggle ? "Sign-up" : "Login"}</Button>
      </div>
    </div>
  )
}

export default LoginPage