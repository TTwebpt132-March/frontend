import axios from 'axios';

export const FETCH_REQUEST_PROGRESS = 'FETCH_REQUEST_PROGRESS';
export const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
export const FETCH_REQUEST_FAILURE = "FETCH_REQUEST_FAILURE";
export const ADD_NEW_RECIPE = "ADD_NEW_RECIPE";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const EDIT_RECIPE = "EDIT_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const CLEAR_SEARCH = "CLEAR_SEARCH";

export const addRecipe = (recipeObj) => {
    return { type: ADD_NEW_RECIPE, payload: { id: Date.now(), ...recipeObj } };
}

export const clearSearch = () => {
    return { type: CLEAR_SEARCH };
}

export const searchRecipe = (searchTerm) => {
    return { type: SEARCH_RECIPE, payload: searchTerm };
}

export const deleteRecipe = (recipeId) => {
    return { type: DELETE_RECIPE, payload: recipeId };
}

export const editRecipe = (editedObj) => {
    return { type: EDIT_RECIPE, payload: editedObj };
}

export const setError = (errorMessage) => {
    return { type: SET_ERROR_MESSAGE, payload: errorMessage };
}

export const fetchRecipes = () => (dispatch) => {
    dispatch({ type: FETCH_REQUEST_PROGRESS })
    axios.get('')
        .then((res) => {
            console.log(res.data);
            dispatch({ type: FETCH_REQUEST_FAILURE, payload: res.data })
        })
        .catch((err) => {
            console.log(err.message);
            dispatch({ type: FETCH_REQUEST_FAILURE, payload: err.message })
        })
}

