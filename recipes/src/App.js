import './App.css';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/dashboard.js';
import Signup from './Components/signup.js';
import DetailedCard from './Components/detailedrecipecard.js';
import RecipeForm from './Components/recipeform.js';
import PrivateRoute from './Components/PrivateRoute.js';
import Home from './Components/home.js';


function App() {
  return (
    <div className="App">
      <h1>Grandma's Recipes</h1>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/recipe/:id" component={DetailedCard} />
        <PrivateRoute exact path="/form" component={RecipeForm} />
        <Route>
          <Home />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
