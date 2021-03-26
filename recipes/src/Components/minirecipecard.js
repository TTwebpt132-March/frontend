import React from 'react';
import { Card, CardBody, CardLink, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

const MiniCard = (props) => {
    return (
        <div>
            <Card className="miniCard">
                <CardBody>
                    <CardTitle tag="h3">Potato Pie</CardTitle>
                </CardBody>
                <CardBody>
                    <CardText>Grandma's Recipe</CardText>
                    <CardText>#dinner</CardText>
                    <Button className="recipeButton">View Recipe</Button>
                </CardBody>
            </Card>

        </div>
    )
}

export default MiniCard;

/*
RecipeCard should have a title, source (ex Grandma) & category (dinner, chicken, dessert, pasta)
*/