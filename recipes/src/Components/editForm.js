import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRecipe } from '../actions/index.js';
import jwt_decode from 'jwt-decode';

const EditForm = (props) => {
    const history = useHistory();

    let decoded = ""
    let token = localStorage.getItem('authToken');
    if (token) {
        decoded = jwt_decode(token);
        console.log(decoded);
    }

    const { id } = useParams();
    console.log(id);

    const navigateFunction = (evt) => {
        history.push('/dashboard');
    }

    const [form, setForm] = useState({})

    useEffect(() => {
        setForm(props.recipes[id]);
    }, [id, props.recipes])


    if (Object.keys(form).length === 0) {
        return <div>Fetching Recipe Details</div>
    }

    console.log(form);

    const addIngredients = () => {
        setForm({ ...form, recipe_ingredients: [...form.recipe_ingredients, ""] })
    }

    const addCategory = () => {
        setForm({ ...form, recipe_category: [...form.recipe_category, ""] })
    }

    const nonDynamicChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        setForm({ ...form, [evt.target.name]: evt.target.value })
    }

    const categoryChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        const updatedCategory = [...form.recipe_category];
        updatedCategory[evt.target.dataset.idx] = evt.target.value;
        setForm({ ...form, recipe_category: updatedCategory });
    }

    const ingredientChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        const updatedIngredients = [...form.recipe_ingredients];
        updatedIngredients[evt.target.dataset.idx] = evt.target.value;
        setForm({ ...form, recipe_ingredients: updatedIngredients });
    }

    const formSubmit = (evt) => {
        evt.preventDefault();
        console.log(form)
        props.updateRecipe(form.id, form, decoded.userID);
        history.push('/dashboard');
    }

    const deleteIngredients = (evt, ind) => {
        evt.preventDefault();
        const ingredientList = [...form.recipe_ingredients];
        ingredientList.splice(ind, 1);
        setForm({ ...form, recipe_ingredients: ingredientList });
    }

    const deleteCategories = (evt, ind) => {
        evt.preventDefault();
        const categoryList = [...form.recipe_category];
        categoryList.splice(ind, 1);
        setForm({ ...form, recipe_category: categoryList });
    }

    return (
        <Container>
            <button className="navButton" onClick={navigateFunction}>Return to Dashboard</button>
            <form className="recipeForm" onSubmit={formSubmit}>
                <h3>Edit Recipe:</h3>
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
                        name="recipe_source"
                        value={form.recipe_source}
                        placeholder="Ex. Grandma, Mom"
                        onChange={nonDynamicChange}
                    />
                </div>

                {
                    form.recipe_ingredients.map((val, idx) => {
                        const ingredientId = `name-${idx}`;
                        return (
                            <div key={`ingredient-${idx}`} className='ingredients form-group'>
                                <label htmlFor={ingredientId}>{`Ingredient #${idx + 1}: `}</label>
                                <input
                                    type="text"
                                    name={ingredientId}
                                    data-idx={idx}
                                    value={form.recipe_ingredients[idx]}
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
                <input type="button" value="Add Ingredients" onClick={addIngredients} />
                {
                    form.recipe_category.map((val, idx) => {
                        const categoryId = `name-${idx}`;
                        return (
                            <div key={`category-${idx}`} className="categories form-group">
                                <label htmlFor={categoryId}>{`Category #${idx + 1}: `}</label>
                                <input
                                    type="text"
                                    name={categoryId}
                                    placeholder={`Enter Category`}
                                    data-idx={idx}
                                    value={form.recipe_category[idx]}
                                    id={categoryId}
                                    className="type"
                                    onChange={categoryChange}
                                />
                                <button onClick={(evt) => deleteCategories(evt, idx)}>Delete</button>
                            </div>
                        )
                    })
                }
                <input type="button" value="Add Categories" onClick={addCategory} />
                <div className="form-group">
                    <label htmlFor="recipeInstructions"> Instructions: </label>
                    <textarea
                        id="recipeInstructions"
                        name="instructions"
                        value={form.recipe_instructions}
                        placeholder="input instructions"
                        onChange={nonDynamicChange}
                    />
                </div>
                <button>Update Changes</button>
            </form>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRecipe: (recipeId, obj, user_id) => dispatch(updateRecipe(recipeId, obj, user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);