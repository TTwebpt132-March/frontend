import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const MiniCard = (props) => {
    const { recipe, cardId } = props;
    return (
        <div>
            <Card className="miniCard">
                <CardBody>
                    <CardTitle tag="h3">{recipe.title}</CardTitle>
                </CardBody>
                <CardBody>
                    <CardText>{recipe.source}</CardText>
                    <CardTitle tag="h5">Categories</CardTitle>
                    {
                        recipe.category && recipe.category.map((c, index) => {
                            return <CardText key={index}>{`# ${c}`}</CardText>
                        })
                    }
                    <Link to={`/recipe/${cardId}`}>
                        <Button className="recipeButton">View Recipe</Button>
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