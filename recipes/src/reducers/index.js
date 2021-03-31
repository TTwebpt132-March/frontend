import {
    FETCH_REQUEST_PROGRESS,
    FETCH_REQUEST_SUCCESS,
    FETCH_REQUEST_FAILURE,
    ADD_NEW_RECIPE,
    DELETE_RECIPE,
    SET_ERROR_MESSAGE,
    SEARCH_RECIPE,
    CLEAR_SEARCH,
    EDIT_RECIPE
} from '../actions/index.js';
import fakeRecipeData from "../Utils/fakedata";

const initialState = {
    recipes: [],
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
        case EDIT_RECIPE: {
            const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
            const newArray = [...state.recipes];
            newArray[index] = action.payload;
            return {
                ...state, recipes: newArray,
            }
        }
        case SET_ERROR_MESSAGE:
            return { ...state, loading: false, error: action.payload }
        case SEARCH_RECIPE:
            return {
                ...state, loading: false,
                recipes: state.recipes.filter((recipe) => {
                    return (recipe.category.filter((cat) => cat.type.toLowerCase() === action.payload.toLowerCase())).length > 0 ? recipe : '';
                })
            }
        /*recipe.title.toLowerCase() === action.payload.toLowerCase() */
        case CLEAR_SEARCH:
            return { ...state, loading: false, recipes: [...fakeRecipeData] };
        default:
            return state;
    }
}

export default reducer;