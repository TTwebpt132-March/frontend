import React from 'react';
import MiniCard from './minirecipecard.js';
import { Container, Button } from 'reactstrap';

const Dashboard = (props) => {
    return (
        <div>
            <div className="navigation">
                <Button className="navButton">Logout</Button>
                <Button className="navButton">Enter New Recipe</Button>
            </div>
            <Container className="themed-container" fluid={true}>
                <MiniCard />
                <MiniCard />
                <MiniCard />
            </Container>

        </div>
    )
}

export default Dashboard;