import React, {useState, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import NavBar from './components/layouts/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import {Alert} from './components/layouts/Alert';
import {About} from './components/pages/About';
import User from './components/users/User';

import GitHubState from './context/github/GitHubState';

const App = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setALert] = useState(null);

    const getUserRepos = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        setRepos(res.data);
        setLoading(false);
    };

    const setAlert = (message, type) => {
        setALert({message, type});

        setTimeout(() => {
            setALert(null);
        }, 2000);
    };

    return (
        <GitHubState>
            <Router>
                <div className='App'>
                    <NavBar />
                    <div className='container'>
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={(props) => (
                                    <Fragment>
                                        <Search setAlert={setAlert} />
                                        <Users />
                                    </Fragment>
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route
                                exact
                                path='/user/:login'
                                render={(props) => (
                                    <User
                                        {...props}
                                        getUserRepos={getUserRepos}
                                        repos={repos}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GitHubState>
    );
};

export default App;
