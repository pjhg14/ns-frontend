import { useState } from 'react'
import { Button, Form, Message, Input } from 'semantic-ui-react'

function Login(){
  const [userEmail, setUserEmail] = useState("")

  function handleFormSubmit(event) {
    event.preventDefault()
    
    // do stuff
    fetch(`http://localhost:9292/users/login/${userEmail}`)
      .then((resp) => resp.json())
      .then(queriedUser => {
        console.log(queriedUser)
        
      })
  }

  return(
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleFormSubmit} >
        <label htmlFor="useremail" className="label">Your Email</label>
        <Input className="input" id="useremail" value={userEmail} onChange={e => setUserEmail(e.target.value)} type="text" placeholder="Your Email"></Input>
        <Message
          error
          header='Action Forbidden'
          content='You can only sign up for an account once with a given e-mail address.'
        />
        <Button>Submit</Button>
      </Form>
    </div>
  )
}

export default Login