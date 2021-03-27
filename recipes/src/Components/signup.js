import React, { useState, useEffect } from 'react';
import * as yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

// Create a schema to create a submitting criteria for our sign up

const schema = yup.object({
    email: yup.string().required('email is required'),
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
})
const Signup = (props) => {
    //Use State to take all our data in

    const initialFormValues = {
        email: '',
        username: '',
        password: ''
    }

    const history = useHistory();


    const [formData, setFormData] = useState(initialFormValues)
    const [errors, setErrors] = useState({ email: '', username: '', password: '' })
    const [disabled, setDisabled] = useState(true);

    // create a onChange handler for inputs to recognize change going on


    //    if(/^[a-zA-Z]+$/.test(event.target.value)){          <=== was originally used for names to only input alphabet only (no 1-0) 
    //                                                              got rid of it because it didn't delete the first letter, and didn't recognize spaces
    //   }
    const onInputChange = event => {
        console.log(event.target.name, event.target.value)
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    useEffect(() => {
        schema.isValid(formData).then(valid => setDisabled(!valid))
    }, [formData])
    // create a submit function too submit our date once its all put in

    const submit = function (event) {
        event.preventDefault()
        axios.post("https://recipeslambda.herokuapp.com/api/auth/register", formData)
            .then((res) => {
                console.log(res.data);
            })
    }

    //create a helper function too confirm if "comfirm password" === "password"
    return (
        <div className="signupForm" >
            <button onClick={() => { history.push("/") }}>Home</button>
            <h3>Sign Up Form</h3>
            <form className="form" onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="email"> Email: </label>
                    <input placeholder="JohnDoe@John.com" type="text" name="email" id="email" onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="username"> Username: </label>
                    <input placeholder="JohnDoe1234" type="text" name="username" id="username" onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password"> Password: </label>
                    <input placeholder="Password1234" type="text" name="password" id="password" onChange={onInputChange} />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Signup;