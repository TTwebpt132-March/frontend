import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecipe } from '../actions/index.js';

const DetailedCard = (props) => {
    const { id } = useParams();
    console.log(parseInt(id));

    const history = useHistory();

    const [relRecipe, setRecipe] = useState([]);

    useEffect(() => {
        setRecipe(props.recipes.filter((recipe) => recipe.id === parseInt(id)));
    }, [id, props.recipes])

    if (relRecipe.length === 0) {
        return <div>Loading Recipe....</div>
    }

    return (
        <div className="recipeCard">
            {console.log(relRecipe[0])}
            <Link to="/dashboard">
                <button className="navButton">Return to Dashboard</button>
            </Link>
            <Card className="miniCard">
                <CardBody>
                    <CardTitle tag="h3">{relRecipe[0].title}</CardTitle>
                    <CardTitle tag="h3">{relRecipe[0].id}</CardTitle>
                </CardBody>
                <CardBody>
                    <CardText>{`Recipe By: ${relRecipe[0].source}`}</CardText>
                    <CardText>{relRecipe[0].category}</CardText>
                </CardBody>
            </Card>
            <Card className="miniCard">
                <CardBody>
                    <CardTitle tag="h3">Ingredients</CardTitle>
                </CardBody>
                <CardBody>
                    {
                        relRecipe[0].ingredients.map((ingredient, index) => {
                            return <CardText key={index}>{ingredient.name}</CardText>
                        })
                    }
                </CardBody>
            </Card>
            <Card className="miniCard">
                <CardBody>
                    <CardTitle tag="h3">Instructions</CardTitle>
                </CardBody>
                <CardBody>
                    {
                        relRecipe[0].instructions.map((instruction, index) => {
                            return <CardText key={index}>{instruction.step}</CardText>
                        })
                    }
                </CardBody>
            </Card>
            <div className="editRecipe">
                <button>Edit Recipe</button>
                <button onClick={() => { props.deleteRecipe(relRecipe[0].id); history.push('/dashboard') }}>Delete Recipe</button>
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