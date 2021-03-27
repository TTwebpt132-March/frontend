import React, { useState } from 'react'

const Search = (props) => {
    const [search, setSearch] = useState("")

    const searchRecipe = (evt) => {
        console.log(evt.target.name, evt.target.value);
        setSearch(evt.target.value);
    }

    const clearSearch = (evt) => {
        evt.preventDefault();
        setSearch("");
    }

    return (
        <div className="search">
            <input type="text" placeholder="search recipes" name="search" value={search} onChange={searchRecipe} />
            <button onClick={clearSearch}>Clear</button>
        </div>
    )
}

export default Search;