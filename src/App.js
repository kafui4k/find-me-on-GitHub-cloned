import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/layouts/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import {Alert} from './components/layouts/Alert';
import {About} from './components/pages/About';
import User from './components/users/User';

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
                                <Route
                                    exact
                                    path='/'
                                    render={(props) => (
                                        <Fragment>
                                            <Search />
                                            <Users />
                                        </Fragment>
                                    )}
                                />
                                <Route exact path='/about' component={About} />
                                <Route
                                    exact
                                    path='/user/:login'
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GitHubState>
    );
};

export default App;
