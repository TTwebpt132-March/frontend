import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
//structuring my form
const initialFormValues = {
    username: "",
    password: ""
}
const initialFormErrors = {
    username: "",
    password: ""
}


const initialDisabled = true
// formSchema for validation
const validationSchema = yup.object({
    username: yup.string()
        .required('username is required'),
    password: yup.string()
        .min(8, 'Password must be 8 characters long')
        .required('Password is required, please fill out.'),
})

const Login = (props) => {
    //states
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)
    //input handlers
    const history = useHistory();

    const setFormErrors = (name, value) => {
        yup.reach(validationSchema, name).validate(value)
            .then(() => setErrors({ ...formErrors, [name]: '' }))
            .catch(err => {
                setErrors({ ...formErrors, [name]: err.errors })
            })
    }

    const change = event => {
        const { value, name } = event.target;
        console.log(name, value);
        setFormErrors(name, value);
        setFormValues({ ...formValues, [name]: value });
    }

    useEffect(() => {
        validationSchema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

    const submit = (evt) => {
        evt.preventDefault();
        console.log(formValues);
        axios.post("https://recipeslambda.herokuapp.com/api/auth/login", formValues)
            .then((res) => {
                console.log(res);
                localStorage.setItem('authToken', res.data.token);
                history.push('/dashboard');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <form className='login-container' onSubmit={submit}>
                <h3>Login</h3>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                        value={formValues.email}
                        id="username"
                        onChange={change}
                        name='username'
                        type='text'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        value={formValues.password}
                        id="password"
                        onChange={change}
                        name='password'
                        type='password'
                    />
                </div>
                <button className='loginBtn' disabled={disabled}> Login </button>
                <div>
                    <Link to="/signup" className="registerLink">Don't have an account? Register!</Link>
                </div>
            </form>
        </div>
    )
}
export default Login;