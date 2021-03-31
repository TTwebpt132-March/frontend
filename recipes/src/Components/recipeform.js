import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/index.js';
import axiosWithAuth from '../Utils/axiosWithAuth.js';
import jwt_decode from 'jwt-decode';

const RecipeForm = (props) => {
    const history = useHistory();

    const initialFormValues = {
        title: '',
        source: '',
        ingredients: [],
        category: [],
        instructions: ''
    }

    let decoded = " "
    let token = localStorage.getItem('authToken');
    if (token) {
        decoded = jwt_decode(token);
        console.log(decoded);
    }


    const [form, setForm] = useState(initialFormValues)

    const addIngredients = (evt) => {
        evt.preventDefault();
        setForm({ ...form, ingredients: [...form.ingredients, ""] })
    }

    const addCategory = (evt) => {
        evt.preventDefault();
        setForm({ ...form, category: [...form.category, ""] })
    }

    const nonDynamicChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        setForm({ ...form, [evt.target.name]: evt.target.value })
    }

    const categoryChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        const updatedCategory = [...form.category];
        updatedCategory[evt.target.dataset.idx] = evt.target.value;
        setForm({ ...form, category: updatedCategory });
    }

    const ingredientChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        const updatedIngredients = [...form.ingredients];
        updatedIngredients[evt.target.dataset.idx] = evt.target.value;
        setForm({ ...form, ingredients: updatedIngredients });
    }

    const navigateFunction = (evt) => {
        history.push('/dashboard');
    }

    const formSubmit = (evt) => {
        evt.preventDefault();
        console.log(form)

        axiosWithAuth().post(`/api/recipes`, { ...form, user_id: decoded.userID })
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err.message);
            })
        setForm(initialFormValues);
        history.push("/dashboard");
    }

    const deleteIngredients = (evt, ind) => {
        evt.preventDefault();
        const ingredientList = [...form.ingredients];
        ingredientList.splice(ind, 1);
        setForm({ ...form, ingredients: ingredientList });
    }

    const deleteCategories = (evt, ind) => {
        evt.preventDefault();
        const categoryList = [...form.category];
        categoryList.splice(ind, 1);
        setForm({ ...form, category: categoryList });
    }

    return (
        <div>
            <Container className="themed-container form-container" fluid={true}>
                <button className="navButton" onClick={navigateFunction}>Return to Dashboard</button>
                <form className="recipeForm" onSubmit={formSubmit}>
                    <h3>Enter Recipe:</h3>
                    <div className="form-group">
                        <label htmlFor="recipeTitle"> Title: </label>
                        <input
                            id="recipeTitle"
                            name="title"
                            value={form.title}
                            placeholder="Recipe Title"
                            onChange={nonDynamicChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipeSource"> Source: </label>
                        <input
                            id="recipeSource"
                            name="source"
                            value={form.source}
                            placeholder="Ex. Grandma, Mom"
                            onChange={nonDynamicChange}
                        />
                    </div>

                    {
                        form.ingredients.map((val, idx) => {
                            const ingredientId = `name-${idx}`;
                            return (
                                <div key={`ingredient-${idx}`} className='ingredients form-group'>
                                    <label htmlFor={ingredientId}>{`Ingredient #${idx + 1}: `}</label>
                                    <input
                                        type="text"
                                        name={ingredientId}
                                        data-idx={idx}
                                        value={form.ingredients[idx]}
                                        id={ingredientId}
                                        placeholder={`Enter Ingredient`}
                                        onChange={ingredientChange}
                                        className="name"
                                    />
                                    <button onClick={(evt) => deleteIngredients(evt, idx)}>Delete</button>
                                </div>
                            )
                        })
                    }
                    <button onClick={addIngredients} >Add Ingredients</button>
                    {
                        form.category.map((val, idx) => {
                            const categoryId = `name-${idx}`;
                            return (
                                <div key={`category-${idx}`} className="categories form-group">
                                    <label htmlFor={categoryId}>{`Category #${idx + 1}: `}</label>
                                    <input
                                        type="text"
                                        name={categoryId}
                                        placeholder={`Enter Category`}
                                        data-idx={idx}
                                        value={form.category[idx]}
                                        id={categoryId}
                                        className="type"
                                        onChange={categoryChange}
                                    />
                                    <button onClick={(evt) => deleteCategories(evt, idx)}>Delete</button>
                                </div>
                            )
                        })
                    }
                    <button onClick={addCategory} >Add Categories</button>
                    <div className="form-group">
                        <label htmlFor="recipeInstructions"> Instructions: </label>
                        <textarea
                            id="recipeInstructions"
                            name="instructions"
                            value={form.instructions}
                            placeholder="Instructions"
                            onChange={nonDynamicChange}
                        />
                    </div>
                    <button>Submit</button>
                </form>
            </Container>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRecipe: (obj) => dispatch(addRecipe(obj))
    }
}

export default connect(null, mapDispatchToProps)(RecipeForm);

/*
RecipeForm should have a title, source (ex Grandma), ingredients, instructions, and category (dinner, chicken, dessert, pasta)
*/