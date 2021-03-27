import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const MiniCard = (props) => {
    const { recipe } = props;
    return (
        <div>
            <Card className="miniCard">
                <CardBody>
                    <CardTitle tag="h3">{recipe.title}</CardTitle>
                </CardBody>
                <CardBody>
                    <CardText>{recipe.source}</CardText>
                    <CardText>{recipe.category}</CardText>
                    <Link to={`/recipe/${recipe.id}`}>
                        <Button className="recipeButton">View Details</Button>
                    </Link>
                </CardBody>
            </Card>

        </div>
    )
}

export default MiniCard;

/*
RecipeCard should have a title, source (ex Grandma) & category (dinner, chicken, dessert, pasta)
*/