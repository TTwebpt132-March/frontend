import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecipe } from '../actions/index.js';

const DetailedCard = (props) => {
    const { id } = useParams();
    console.log(parseInt(id));

    const history = useHistory();

    const [relRecipe, setRecipe] = useState({
        id: '',
        title: '',
        recipe_source: '',
        recipe_category: [],
        recipe_ingredients: [],
        recipe_instructions: ''
    });

    useEffect(() => {
        setRecipe(props.recipes[parseInt(id)]);
    }, [id, props.recipes])

    if (relRecipe.recipe_category.length === 0) {
        return <div>Fetching Recipes...</div>
    }

    return (
        <div className="recipeCard">
            {console.log(relRecipe)}
            <Link to="/dashboard">
                <button className="navButton">Return to Dashboard</button>
            </Link>
            <Card className="miniCard">
                <CardBody>
                    <CardTitle tag="h3">{relRecipe.title}</CardTitle>
                    <CardTitle tag="h3">{relRecipe.id}</CardTitle>
                </CardBody>
                <CardBody>
                    <CardText>{`Recipe By: ${relRecipe.recipe_source}`}</CardText>
                    <CardTitle tag="h4">Categories</CardTitle>
                    {
                        relRecipe.recipe_category.map((cat, index) => {
                            return <CardText key={index}>{cat}</CardText>
                        })
                    }
                </CardBody>
            </Card>
            <Card className="miniCard">
                <CardBody>
                    <CardTitle tag="h3">Ingredients</CardTitle>
                </CardBody>
                <CardBody>
                    {
                        relRecipe.recipe_ingredients.map((ingredient, index) => {
                            return <CardText key={index}>{ingredient}</CardText>
                        })
                    }
                </CardBody>
            </Card>
            <Card className="miniCard">
                <CardBody>
                    <CardTitle tag="h3">Instructions</CardTitle>
                </CardBody>
                <CardBody>
                    <CardText>{relRecipe.recipe_instructions}</CardText>
                </CardBody>
            </Card>
            <div className="editRecipe">
                <button onClick={() => { history.push(`/edit/${id}`) }}>Edit Recipe</button>
                <button onClick={() => { props.deleteRecipe(relRecipe.id); history.push('/dashboard') }}>Delete Recipe</button>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteRecipe: (id) => dispatch(deleteRecipe(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedCard);