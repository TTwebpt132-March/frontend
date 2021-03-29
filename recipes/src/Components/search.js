import React, { useState } from 'react'
import { connect } from 'react-redux';
import { searchRecipe, clearSearch } from '../actions/index.js';

const Search = (props) => {
    const initialValue = "";
    const [search, setSearch] = useState(initialValue)

    const registerSearch = (evt) => {
        console.log(evt.target.name, evt.target.value);
        setSearch(evt.target.value);
    }

    const clearSearch = (evt) => {
        evt.preventDefault();
        setSearch(initialValue);
        props.clearSearch();
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
        clearSearch: () => dispatch(clearSearch())
    }
}

export default connect(null, mapDispatchToProps)(Search);