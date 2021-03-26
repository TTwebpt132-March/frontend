import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const DetailedCard = (props) => {
    return (
        <div>
            This is the Detailed Recipe Card
            <Container className="themed-container" fluid={true}>
                This is the detailed recipe
            </Container>
        </div>
    )
}

export default DetailedCard;