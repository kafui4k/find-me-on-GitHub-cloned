import {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
} from '../types';

let GithubClientId;
let GithubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    GithubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    GithubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    GithubClientId = process.env.GITHUB_CLIENT_ID;
    GithubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GitHubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // searching user here....
    const searchUsers = async (text) => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${GithubClientId}&client_secret=${GithubClientSecret}`,
        );

        dispatch({type: SEARCH_USERS, payload: res.data.items});
    };

    // Get a User
    const getUser = async (username) => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${GithubClientId}&client_secret=${GithubClientSecret}`,
        );

        dispatch({type: GET_USER, payload: res.data});
    };

    // Get a Repo
    const getUserRepos = async (username) => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${GithubClientId}&client_secret=${GithubClientSecret}`,
        );

        dispatch({type: GET_REPOS, payload: res.data});
    };

    // Clear Users
    const clearUsers = () => dispatch({type: CLEAR_USERS});

    // Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
            }}
        >
            {props.children}
        </GithubContext.Provider>
    );
};

export default GitHubState;
