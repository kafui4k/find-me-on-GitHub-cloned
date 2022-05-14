import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/layouts/NavBar';
import {Home} from './components/pages/Home';
import {Alert} from './components/layouts/Alert';
import {About} from './components/pages/About';
import User from './components/users/User';
import {NotFound} from './components/pages/NotFound';

import GitHubState from './context/github/GitHubState';
import AlertState from './context/alert/AlertState';

const App = () => {
    return (
        <GitHubState>
            <AlertState>
                <Router>
                    <div className='App'>
                        <NavBar />
                        <div className='container'>
                            <Alert />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/about' component={About} />
                                <Route
                                    exact
                                    path='/user/:login'
                                    component={User}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GitHubState>
    );
};

export default App;
