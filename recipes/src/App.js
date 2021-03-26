import './App.css';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/dashboard.js';
import Login from './Components/login.js';
import Signup from './Components/signup.js';
import MiniCard from './Components/minirecipecard.js';
import DetailedCard from './Components/detailedrecipecard.js';
import RecipeForm from './Components/recipeform.js';
import PrivateRoute from './Components/PrivateRoute.js';
import Home from './Components/home.js';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/recipe" component={DetailedCard} />
        <Route exact path="/form" component={RecipeForm} />
        <Route>
          <Signup />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
