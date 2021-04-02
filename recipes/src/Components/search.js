import React, { useState } from 'react'
import { connect } from 'react-redux';
import { searchRecipe, clearSearch, fetchRecipes } from '../actions/index.js';
import jwt_decode from 'jwt-decode';

const Search = (props) => {
    const initialValue = "";
    const [search, setSearch] = useState(initialValue)

    let decoded = ""
    let token = localStorage.getItem('authToken');
    if (token) {
        decoded = jwt_decode(token);
        console.log(decoded);
    }

    const registerSearch = (evt) => {
        console.log(evt.target.name, evt.target.value);
        setSearch(evt.target.value);
    }

    const clearSearch = (evt) => {
        evt.preventDefault();
        setSearch(initialValue);
        props.fetchRecipes(decoded.userID);
    }

    const searchRecipe = (evt) => {
        evt.preventDefault();
        console.log(search);
        props.searchRecipe(search);
    }

    return (
        <div className="search">
            <input type="text" placeholder="search recipes" name="search" value={search} onChange={registerSearch} />
            <button onClick={searchRecipe}>Search</button>
            <button onClick={clearSearch}>Clear Search</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchRecipe: (term) => dispatch(searchRecipe(term)),
        clearSearch: () => dispatch(clearSearch()),
        fetchRecipes: (id) => dispatch(fetchRecipes(id))
    }
}

export default connect(null, mapDispatchToProps)(Search);