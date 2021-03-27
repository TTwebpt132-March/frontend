import { FETCH_REQUEST_PROGRESS, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAILURE, ADD_NEW_RECIPE, DELETE_RECIPE, SET_ERROR_MESSAGE } from '../actions/index.js';
import fakeRecipeData from "../Utils/fakedata";

const initialState = {
    recipes: [...fakeRecipeData],
    loading: false,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST_PROGRESS:
            return { ...state, loading: true }
        case FETCH_REQUEST_SUCCESS:
            return { ...state, loading: false, recipes: action.payload, error: '' }
        case FETCH_REQUEST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case ADD_NEW_RECIPE:
            return { ...state, loading: false, error: '', recipes: [...state.recipes, action.payload] }
        case DELETE_RECIPE:
            return { ...state, loading: false, recipes: state.recipes.filter((recipe) => recipe.id !== action.payload) }
        case SET_ERROR_MESSAGE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default reducer;