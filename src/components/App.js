import Header from './Header'
import LoginPage from './LoginPage'
import ComicPage from './ComicPage'
import GroupPage from './GroupPage'
import AddComicForm from './AddComicForm'
import { Switch, Route } from "react-router-dom"
import { createGlobalStyle } from 'styled-components'
import { createContext, useState } from 'react'

const GlobalStyle= createGlobalStyle`

  body {
    margin: 0 10vw;
    background-color: #e3b94f;
  }

  html {
    background-color: #ffe195
  }

  h1 {
    font-size: 8em;
    font-family: 'Permanent Marker', cursive;
    text-align: center;
    color: #E24D28
  }

  h1:hover {
    color: #33c1b1;
  }

  h2 {
    font-size: 4em;
    font-family: 'Space Grotesk', sans-serif;
    color: #264653
  }

  h3 {
    font-size: 2em;
    font-family: 'Space Grotesk', sans-serif;
    color: #264653
  }

  a {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2em;
    padding-right: 15px;
    color: #264653
  }

  a:hover {
    color: #33c1b1
  }

  p {
    font-family: 'Quattrocento', serif;
  }
  `

export const UserContext = createContext(null)


function App() {
  const [user, setUser] = useState({id: -1, name: "Guest"})
  const userState = {
    get: user,
    set: setUser
  }

  console.log({user})

  return (
    <UserContext.Provider value={userState}>
      <div className="App">
        <GlobalStyle />
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route expact path="/comics">
              <ComicPage />
            </Route>
            <Route exact path="/groups">
              <GroupPage />
            </Route>
            <Route exact path="/addComic">
              <AddComicForm />
            </Route>
          </Switch>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
