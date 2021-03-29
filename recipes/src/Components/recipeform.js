import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/index.js';

const RecipeForm = (props) => {
    const blankIngredient = {
        name: '',
    }
    const history = useHistory();

    const blankCategory = {
        type: '',
    }

    const initialFormValues = {
        title: '',
        source: '',
        ingredients: [blankIngredient],
        category: [blankCategory],
        instructions: ''
    }

    const [form, setForm] = useState(initialFormValues)

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

    const navigateFunction = (evt) => {
        history.push('/dashboard');
    }

    const formSubmit = (evt) => {
        evt.preventDefault();
        console.log(form)
        props.addRecipe(form);
        setForm(initialFormValues);
        history.push("/dashboard");
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