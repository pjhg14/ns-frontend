import Header from './Header'
import Login from './Login'
import ComicPage from './ComicPage'
import Group from './Group'
import AddComicForm from './AddComicForm'
import { Switch, Route } from "react-router-dom"
import { createGlobalStyle } from 'styled-components'
import React, { useState } from 'react'

const GlobalStyle= createGlobalStyle`
  body {
  margin: 0 20% 0 20%;
  background-color: #eae0d5;
}

  h1 {
    font-size: 8em;
    font-family: 'Permanent Marker', cursive;
    text-align: center;
    color: #22333b
  }

  h1:hover {
    color: #1e70bf;
  }

  h2 {
    font-size: 4em;
    font-family: 'Space Grotesk', sans-serif;
    color: #5E503F
  }

  h3 {
    font-size: 2em;
    font-family: 'Space Grotesk', sans-serif;
    color: #5E503F
  }

  a {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2em;
    padding-right: 15px;
    color: #5E503F
  }

  p {
    font-family: 'Quattrocento', serif;
  }


`

export const UserContext = React.createContext(null)


function App() {
  const [user, setUser] = useState({id: -1, name: "Guest"})
  const userState = {
      get: user,
      set: setUser
  }

  return (
    <UserContext.Provider value={userState}>
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route expact path="/comics">
            <ComicPage />
          </Route>
          <Route exact path="/groups">
            <Group />
          </Route>
          <Route exact path="/addComic">
            <AddComicForm />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
