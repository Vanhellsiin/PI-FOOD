import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './componentes/LandingPage';
import Home from './componentes/Home';
import RecipeCreate from './componentes/RecipeCreate';
import Detail from './componentes/Detail';




function App() {
  return (
    <BrowserRouter>
    <React.Fragment>
      
        <Route exact path='/' component={LandingPage}/>
        <Route exact path= '/home' component={Home}/>
        <Route path= '/recipes' component={RecipeCreate}/>
        <Route path= '/detail/:id' component={Detail}/>
        
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
