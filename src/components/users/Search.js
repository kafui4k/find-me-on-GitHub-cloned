import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import GitHubContext from '../../context/github/githubContext';

const Search = ({showClear, clearUsers, setAlert}) => {
    const githubContext = useContext(GitHubContext);

    const [text, setText] = useState('');

    const onChange = (event) => setText(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();

        if (text === '') {
            setAlert('Please enter something...', 'light');
        } else {
            githubContext.searchUsers(text);

            setText('');
        }
    };

    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input
                    type='text'
                    name='text'
                    value={text}
                    onChange={onChange}
                    placeholder='Search Users'
                />
                <input
                    type='submit'
                    value={'Search'}
                    className='btn btn-dark btn-block'
                />
            </form>
            {showClear && (
                <button
                    className='btn btn-light btn-block'
                    onClick={clearUsers}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default Search;
