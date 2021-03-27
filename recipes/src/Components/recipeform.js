import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const RecipeForm = (props) => {
    const blankIngredient = {
        name: '',
    }
    const history = useHistory();

    const blankInstruction = {
        step: '',
    }

    const [form, setForm] = useState({
        title: '',
        source: '',
        category: '',
        ingredients: [blankIngredient],
        instructions: [blankInstruction],
    })

    const addIngredients = () => {
        setForm({ ...form, ingredients: [...form.ingredients, { ...blankIngredient }] })
    }

    const addInstructions = () => {
        setForm({ ...form, instructions: [...form.instructions, { ...blankInstruction }] })
    }

    const nonDynamicChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        setForm({ ...form, [evt.target.name]: evt.target.value })
    }

    const instructionChange = (evt) => {
        console.log(evt.target.name, evt.target.value)
        const updatedInstructions = [...form.instructions];
        updatedInstructions[evt.target.dataset.idx][evt.target.className] = evt.target.value;
        setForm({ ...form, instructions: updatedInstructions });
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

    return (
        <div>
            <Container className="themed-container form-container" fluid={true}>
                <button className="navButton" onClick={navigateFunction}>Return to Dashboard</button>
                <form className="recipeForm">
                    <h3>Enter Recipe:</h3>
                    <div className="form-group">
                        <label htmlFor="recipeTitle"> Title: </label>
                        <input
                            id="recipeTitle"
                            name="title"
                            placeholder="Recipe Title"
                            onChange={nonDynamicChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipeSource"> Source: </label>
                        <input
                            id="recipeSource"
                            name="source"
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
                        form.instructions.map((val, idx) => {
                            const instructionId = `name-${idx}`;
                            return (
                                <div key={`instruction-${idx}`} className="instructions form-group">
                                    <label htmlFor={instructionId}>{`Instruction #${idx + 1}: `}</label>
                                    <input
                                        type="text"
                                        name={instructionId}
                                        placeholder={`Enter Instruction`}
                                        data-idx={idx}
                                        id={instructionId}
                                        className="step"
                                        onChange={instructionChange}
                                    />
                                </div>
                            )
                        })
                    }
                    <input type="button" value="Add Instructions" onClick={addInstructions} />
                    <div className="form-group">
                        <label htmlFor="recipeCategory"> Category: </label>
                        <input
                            id="recipeCategory"
                            name="category"
                            placeholder="dinner, pasta, pizza"
                            onChange={nonDynamicChange}
                        />
                    </div>
                    <button>Submit</button>
                </form>
            </Container>
        </div>
    );
}

export default RecipeForm;

/*
RecipeForm should have a title, source (ex Grandma), ingredients, instructions, and category (dinner, chicken, dessert, pasta)
*/