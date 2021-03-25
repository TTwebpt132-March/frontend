import React, {useState, useEffect} from 'react';
import * as yup from 'yup'
import axios from 'axios'

// Create a schema to create a submitting criteria for our sign up

const schema = yup.object().shape({
    name: yup.string().required('name is required').min(2, 'name needs to be more than 2 chars'),
    email: yup.string().required('email is required'),
    username: yup.string().required('username is required'),
    password: yup.string().required('password is required'),
    cPassword: yup.string().required('please confirm password'),
})
const Signup = (props) => {

    //Use State to take all our data in

    const [formData, setFormData] = useState({name:'', email:'', username:'', password:'', cPassword:''})
    const [errors, setErrors] = useState({name:'', email:'', username:'', password:'', cPassword:''})
    const [disabled, setDisabled] = useState(true);

    // create a onChange handler for inputs to recognize change going on
    const onInputChange = event => {
    if(/^[a-zA-Z]+$/.test(event.target.value)){
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        }
    }
    useEffect(() => {
        schema.isValid(formData).then(valid => setDisabled(!valid))
    }, [formData])
    // create a submit function too submit our date once its all put in

    const onSubmit = function(event){
        event.preventDefault()
        axios.post('/', {formData})
    }
    
    //create a helper function too confirm if "comfirm password" === "password"
    return (
        <div className="signFrom" >
            {/*Create a form that inputs Name, Email, Username, Password, Confirm Password, and Submit button */}
            <form className="form" onSubmit={onSubmit}>
                <label> Name: 
                    <input placeholder="John Doe" type="text" name="name" onChange={onInputChange} value={formData.name}/>
                </label>
                <label> Email: 
                    <input placeholder="JohnDoe@John.com" type="text" name="email" onChange={onInputChange} />
                </label>
                <label> Username:
                    <input placeholder="JohnDoe1234" type="text" name="username" onChange={onInputChange} />
                </label>
                <label> Password:
                    <input placeholder="Password1234" type="text" name="password" onChange={onInputChange} />

                </label>
                <label> Confirm Password:
                    <input placeholder="Password1234" type="text" name="cPassword" onChange={onInputChange}/>
                </label>
                <input name="submit" type="submit" />
            </form>
        </div>
    )
}

export default Signup;