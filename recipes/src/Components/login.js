import React from 'react';
const Login = (props) => {
 const {values,submit, change} = props
const onSubmit = evt => {
    evt.preventDefault()
    submit()
}
 const onChange = evt => {
    const {name, value, type} = evt.target
    change(name, value)
}
    return (
        <form className = 'login container' onSubmit = {onSubmit}>
        <button id = 'loginBtn' disabled={disabled}>Login</button>    
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
</div>
        </form>
    )
}
export default Login;