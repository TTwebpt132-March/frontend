import axios from 'axios';
import axiosWithAuth from '../Utils/axiosWithAuth.js';
import jwt_decode from 'jwt-decode';

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
    return { type: ADD_NEW_RECIPE, payload: { ...recipeObj } };
}

export const clearSearch = () => {
    return { type: CLEAR_SEARCH };
}

export const searchRecipe = (searchTerm) => {
    return { type: SEARCH_RECIPE, payload: searchTerm };
}

export const setError = (errorMessage) => {
    return { type: SET_ERROR_MESSAGE, payload: errorMessage };
}

//This helps us decode the token
let decoded = " "
let token = localStorage.getItem('authToken');
if (token) {
    decoded = jwt_decode(token);
    console.log(decoded);
}

export const fetchRecipes = (id) => (dispatch) => {
    dispatch({ type: FETCH_REQUEST_PROGRESS })

    axiosWithAuth().get(`/api/users/${id}/recipes`)
        .then((res) => {
            console.log(res);
            dispatch({ type: FETCH_REQUEST_SUCCESS, payload: res.data.recipes })
        })
        .catch((err) => {
            console.log(err.message);
            dispatch({ type: FETCH_REQUEST_FAILURE, payload: err.message })
        })
}

export const deleteRecipe = (id) => (dispatch) => {
    axiosWithAuth().delete(`/api/recipes/${id}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err.message);
            dispatch({ type: FETCH_REQUEST_FAILURE, payload: err.message });
        })
}

export const updateRecipe = (id, newObj, user_id) => (dispatch) => {
    axiosWithAuth().put(`/api/recipes/${id}`, {
        user_id: user_id, title: newObj.title, source: newObj.recipe_source, ingredients: newObj.recipe_ingredients,
        category: newObj.recipe_category, instructions: newObj.recipe_instructions
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err.message);
            dispatch({ type: FETCH_REQUEST_FAILURE, payload: err.message });
        })
}

