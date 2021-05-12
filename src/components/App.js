import Header from './Header'
import Login from './Login'
import ComicPage from './ComicPage'
import Group from './group-page/Group'
import AddComicForm from './AddComicForm'
import { Switch, Route } from "react-router-dom"
import { createGlobalStyle } from 'styled-components'

const GlobalStyle= createGlobalStyle`
  body {
      margin: 0 20% 0 20%;
  }

  h1 {
    font-size: 8em;
    font-family: 'Luckiest Guy';
  }

  h2 {
    font-size: 4em;
    font-family: 'Luckiest Guy';
  }

  h3 {
    font-size: 2em;
    font-family: 'Luckiest Guy';
  }

  a {
    font-family: 'Luckiest Guy';
    font-size: 2em;
    padding-right: 15px;
    color: black
  }

`

function App() {
  return (
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
  );
}

export default App;
