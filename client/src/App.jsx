import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Paths from './components/paths/Paths';
import Modules from './components/modules/Modules';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path=":path(|paths|path|index)" component={Paths} />  
      <Route path="/paths/:pathId" component={Modules} />
      <Route render={() => <p>Page not found</p>} />
    </Switch>
  </BrowserRouter>
);

export default App;
