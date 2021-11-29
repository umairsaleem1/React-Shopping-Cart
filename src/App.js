import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Cart from './pages/Cart/Cart';

const App = ()=>{
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/cart' component={Cart} />
        <Route path='/:identity' component={ProductDetails} />
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;