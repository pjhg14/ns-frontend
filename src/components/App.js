import Header from './Header'
import Login from './Login'
import ComicPage from './ComicPage'
import Discussion from './Discussion'
import AddComicForm from './AddComicForm'
import { Switch, Route } from "react-router-dom"

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route expact path="/comics">
          <ComicPage />
        </Route>
        <Route exact path="/discussion">
          <Discussion />
        </Route>
        <Route exact path="/addComic">
          <AddComicForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
