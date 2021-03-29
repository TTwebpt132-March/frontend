import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { editRecipe } from '../actions/index.js';

const EditForm = (props) => {
    const history = useHistory();

    const blankIngredient = {
        name: '',
    }

    const blankCategory = {
        type: '',
    }

    const { id } = useParams();
    console.log(id);

    const navigateFunction = (evt) => {
        history.push('/dashboard');
    }

    const [form, setForm] = useState({})

    useEffect(() => {
        setForm(...props.recipes.filter((recipe) => recipe.id === parseInt(id)));
    }, [id, props.recipes])


    if (Object.keys(form).length === 0) {
        return <div>Fetching Recipe Details</div>
    }

    console.log(form);

    const addIngredients = () => {
        setForm({ ...form, ingredients: [...form.ingredients, { ...blankIngredient }] })
    }

    const addCategory = () => {
        setForm({ ...form, category: [...form.category, { ...blankCategory }] })
    }

    const nonDynamicChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        setForm({ ...form, [evt.target.name]: evt.target.value })
    }

    const categoryChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        const updatedCategory = [...form.category];
        updatedCategory[evt.target.dataset.idx][evt.target.className] = evt.target.value;
        setForm({ ...form, category: updatedCategory });
    }

    const ingredientChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        const updatedIngredients = [...form.ingredients];
        updatedIngredients[evt.target.dataset.idx][evt.target.className] = evt.target.value;
        setForm({ ...form, ingredients: updatedIngredients });
    }

    const formSubmit = (evt) => {
        evt.preventDefault();
        console.log(form)
        props.editRecipe(form);
        history.push('/dashboard');
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
                                    value={form.ingredients[idx].name}
                                    id={ingredientId}
                                    placeholder={`Enter Ingredient`}
                                    onChange={ingredientChange}
                                    className="name"
                                />
                            </div>
                        )
                    })
                }
                <input type="button" value="Add Ingredients" onClick={addIngredients} />
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
                                    value={form.category[idx].type}
                                    id={categoryId}
                                    className="type"
                                    onChange={categoryChange}
                                />
                            </div>
                        )
                    })
                }
                <input type="button" value="Add Categories" onClick={addCategory} />
                <div className="form-group">
                    <label htmlFor="recipeInstructions"> Instructions: </label>
                    <input
                        id="recipeInstructions"
                        name="instructions"
                        value={form.instructions}
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
        editRecipe: (obj) => dispatch(editRecipe(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);