import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Login from "./components/UserAuth/login"
import Registration from "./components/UserAuth/register"
import Todos from "./components/Todo/todoList"

function App() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Registration} />
      <Route path="/" exact component={Todos} />
    </Switch>
  );
}

export default App;
