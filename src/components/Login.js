import { useState } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

function Login(){
  const [email, setEmail] = useState("")

  function handleFormSubmit(event) {
    event.preventDefault()
    
    // do stuff
    fetch(`http://localhost:9292/users/login/${email}`)
      .then((resp) => resp.json())
      .then(queriedUser => {
        console.log(queriedUser)
        
      })
  }

  return(
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleFormSubmit} >
        <Form.Input label='Email' placeholder='joe@schmoe.com' value={email} onChange={e => setEmail(e.target.value)}/>
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