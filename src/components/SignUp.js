import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {


  const [cred, setCred] = useState({username:"",  email: "", password: "",cpassword :""  })

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: cred.username, email: cred.email, password: cred.password }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      // Save auth token and redirect 
      localStorage.setItem('token', json.authToken)
      history("/")
      props.showAlert('Account Created Successfully ', 'success')
    }
    else {
      props.showAlert('Invalid Credentials ', 'warning')
    }
  }


  return (
    <div className='container'>
      <h2>SignUp up: </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="username" className="form-label"><strong> User Name</strong></label>
            <input type="text" className="form-control" id="username" name="username" onChange={onChange} />
          </div>
          <label htmlFor="email" className="form-label"><strong> Email address</strong></label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><strong> Password</strong></label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label"><strong> Confirm Password</strong></label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp