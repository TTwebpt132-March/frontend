import './App.css';

import Dashboard from './Components/dashboard.js';
import Login from './Components/login.js';
import Signup from './Components/signup.js';
import MiniCard from './Components/minirecipecard.js';
import DetailedCard from './Components/detailedrecipecard.js';
import RecipeForm from './Components/recipeform.js';


function App() {
  return (
    <div className="App">
      Grandma's Recipes
      <Dashboard />
      <MiniCard />
      <DetailedCard />
      <RecipeForm />
      <Login />
      <Signup />
    </div>
  );
}

export default App;
