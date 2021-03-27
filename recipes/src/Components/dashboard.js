import React from 'react';
import MiniCard from './minirecipecard.js';
import { Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Search from "../Components/search.js";

const Dashboard = (props) => {

    const history = useHistory();

    const logout = (evt) => {
        evt.preventDefault();
        localStorage.removeItem('authToken');
        history.push('/')
    }

    const navigateFunction = (evt) => {
        history.push('/form');
    }

    return (
        <div className="dashboard">
            <div className="navigation">
                <button className="navButton" onClick={navigateFunction}>Enter New Recipe</button>
                <Search />
                <button className="navButton" onClick={logout}>Logout</button>
            </div>
            <Container className="card-container" fluid={true}>
                {props.recipes.map((recipe) => {
                    return <MiniCard key={recipe.id} recipe={recipe} />
                })}
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
    }
}

export default connect(mapStateToProps, null)(Dashboard);