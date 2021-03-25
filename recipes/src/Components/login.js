import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

const initialFormValues = {
    email: "",
    password: ""
    }
    const initialFormErrors = {
    email: "",
    password: ""
    }
    const initialDisabled = true

const Login = () => {
 
const [formValues, setFormValues] = useState(initialFormValues)
const [formErrors, setFormErrors] = useState(initialFormErrors)
const [disabled, setDisabled] = useState(initialDisabled)

const FormSchema = yup.object().shape({

    email: yup.string()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup.string()
        .min(8,'Password must be 8 characters long')
        .required('Password is required, please fill out.'),   
})

const inputChange = (name, value) =>{
    yup.reach({FormSchema,name})
    .validate(value)
    .then(()=>{
      setFormErrors({...formErrors, [name]: ''})
    })
    .catch(err=>{
      setFormErrors({...formErrors, [name]: err.errors[0]})
    })
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  useEffect(() =>{
    FormSchema.isValid(formValues).then(valid => setDisabled(!valid))
  },[formValues])
  

    return (
        <form className = 'login container'>
        <Login
      values = {formValues}
      change = {inputChange}
      errors = {formErrors}
      disabled = {disabled}
      />  

        <div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
        </div> 
        
        <div>
        <label>Email&nbsp;
        <input
        value = {values.email}
        onChange = {onChange}
        name = 'email'
        type = 'email'
        />
        </label>
        <label>Password&nbsp;
            <input
            value = {values.password}
            onChange = {onChange}
            name = 'password'
            type = 'password'
            />
        </label>

        <button className='loginBtn' disabled={disabled}> Login </button>
        </div>
        </form>
    )
}
export default Login;