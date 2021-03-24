import './App.css';

import Dashboard from './Components/dashboard.js';
import Login from './Components/login.js';
import Signup from './Components/signup.js';


function App() {
  return (
    <div className="App">
      Grandma's Recipes
      <Dashboard />
      <Login />
      <Signup />
    </div>
  );
}

export default App;
