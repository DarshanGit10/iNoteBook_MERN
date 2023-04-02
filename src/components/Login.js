import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [cred, setCred] = useState({email:"", password:""})

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    } 

    let history =  useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email : cred.email, password : cred.password }),
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
        // Save auth token and redirect 
        localStorage.setItem('token', json.authToken)
        history("/")
        props.showAlert('Account Logged in Successfully ', 'success')
    }
    else{
        props.showAlert('Invalid Credentials ', 'warning')
    }
    }


    return (
        <div className='container'>
            <h2>Log in: </h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label"><strong>Email address</strong> </label>
                <input type="email" className="form-control" value={cred.email} name="email" id="email" aria-describedby="emailHelp" onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                <input type="password" className="form-control"  value={cred.password} name="password" id="password" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        </div>
    )
}

export default Login