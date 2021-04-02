import React, { useEffect } from 'react';
import MiniCard from './minirecipecard.js';
import { Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Search from "../Components/search.js";
import { fetchRecipes } from '../actions/index.js';
import jwt_decode from 'jwt-decode';

const Dashboard = (props) => {

    const { fetchRecipes, recipes, loading } = props;

    let decoded = ""
    let token = localStorage.getItem('authToken');
    if (token) {
        decoded = jwt_decode(token);
        console.log(decoded);
    }

    const history = useHistory();

    const logout = (evt) => {
        evt.preventDefault();
        localStorage.removeItem('authToken');
        history.push('/')
    }

    const navigateFunction = (evt) => {
        history.push('/form');
    }

    useEffect(() => {
        fetchRecipes(decoded.userID);
    }, [fetchRecipes, decoded.userID])

    if (loading) {
        return <div>Fetching Recipes....</div>
    }

    return (
        <div className="dashboard">
            <div className="navigation">
                <button className="navButton" onClick={navigateFunction}>Enter New Recipe</button>
                <Search />
                <button className="navButton" onClick={logout}>Logout</button>
            </div>
            <Container className="card-container" fluid={true}>
                {recipes && recipes.map((recipe, index) => {
                    return <MiniCard key={index} cardId={index} recipe={recipe} />
                })}
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        recipes: state.recipes,
        error: state.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecipes: (id) => dispatch(fetchRecipes(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);