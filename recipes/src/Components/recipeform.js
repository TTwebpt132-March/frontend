import React, { useState } from 'react';
import { Container } from 'reactstrap';

const RecipeForm = (props) => {
    const blankIngredient = {
        name: '',
    }

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

    return (
        <div>
            <Container className="themed-container form-container" fluid={true}>
                <form className="recipeForm">
                    <label for="recipeTitle"> Title: </label>
                    <input
                        id="recipeTitle"
                        name="title"
                        placeholder="Recipe Title"
                        onChange={nonDynamicChange}
                    />
                    <label for="recipeSource"> Source: </label>
                    <input
                        id="recipeSource"
                        name="source"
                        placeholder="Ex. Grandma, Mom"
                        onChange={nonDynamicChange}
                    />
                    {
                        form.ingredients.map((val, idx) => {
                            const ingredientId = `name-${idx}`;
                            return (
                                <div key={`ingredient-${idx}`} className='ingredients'>
                                    <label for={ingredientId}>{`Ingredient #${idx + 1}: `}</label>
                                    <input
                                        type="text"
                                        name={ingredientId}
                                        data-idx={idx}
                                        id={ingredientId}
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
                                <div key={`instruction-${idx}`} className="instructions">
                                    <label for={instructionId}>{`Instruction #${idx + 1}: `}</label>
                                    <input
                                        type="text"
                                        name={instructionId}
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
                    <label for="recipeCategory"> Category: </label>
                    <input
                        id="recipeCategory"
                        name="category"
                        placeholder="dinner, pasta, pizza"
                        onChange={nonDynamicChange}
                    />

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