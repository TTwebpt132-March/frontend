import React from 'react';

import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const RecipeForm = (props) => {
    return (
        <div>
            This is the RecipeForm
            <Form>
                <FormGroup>
                    <Label for="title" >Title:</Label>
                    <Input type="text" name="title" id="title" placeholder="Enter Title" />
                </FormGroup>
                <FormGroup>
                    <Label for="source" >Source:</Label>
                    <Input type="text" name="source" id="source" placeholder="Enter Source" />
                </FormGroup>
                <FormGroup>
                    <Label for="instructions">Instructions: </Label>
                    <Input type="textarea" name="instructions" id="instructions" />
                </FormGroup>
                <FormGroup>
                    <Label for="ingredients" >Ingredients:</Label>
                    <Input type="text" name="ingredients" id="ingredients" placeholder="Enter Ingredients" />
                </FormGroup>
                <FormGroup>
                    <Label for="category" >Category:</Label>
                    <Input type="text" name="category" id="category" placeholder="Enter Categories" />
                </FormGroup>
            </Form>
            <Button>Add Recipe</Button>
        </div>
    )
}

export default RecipeForm;

/*
RecipeForm should have a title, source (ex Grandma), ingredients, instructions, and category (dinner, chicken, dessert, pasta)
*/