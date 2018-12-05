import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/users/Login';
import SignUp from './components/users/SignUp';
import Paths from './components/paths/Paths';
import Modules from './components/modules/Modules';
import NotFound from './components/404/NotFound';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class App extends Component {
  constructor() {
    super();
    const token = cookies.get('token');
    this.state = {
      isLoggedIn: !!token
    };
  }

  setLoggedInState = () => {
    this.setState({
      isLoggedIn: true
    })
  }
  render() {
    const { isLoggedIn } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' render={() => <Login setLoggedInState={this.setLoggedInState} />}/>
          <Route path='/signup' render={() => <SignUp isLoggedIn={isLoggedIn} />} />
          <Route exact path="/:path(|paths|path|index)" render={props => <Paths {...props} isLoggedIn={isLoggedIn} />} />
          <Route path="/paths/:pathId" render={props => <Modules {...props} isLoggedIn={isLoggedIn} />} />
          <Route component={NotFound} />
          {/* <Route path='/signup' render={() => (
            isLoggedIn === true ? (
              <Redirect to="/paths"/>
            ) : (
              <SignUp isLoggedIn={isLoggedIn} />
            )
          )}/> */}
        </Switch>
      </BrowserRouter>
    );
  }
}
