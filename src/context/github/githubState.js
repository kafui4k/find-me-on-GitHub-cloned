import React, {useReducer} from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
} from '../types';

const GitHubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(GitHubState, initialState);

    // searching user here....

    // Get a User

    // Get a Repo

    // Clear Users

    // Set Loading

    return (
        <githubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
            }}
        >
            {props.children}
        </githubContext.Provider>
    );
};

export default GitHubState;
