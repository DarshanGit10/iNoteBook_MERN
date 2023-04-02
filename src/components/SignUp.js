import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
  const [cred, setCred] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cred.password !== cred.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: cred.username,
        email: cred.email,
        password: cred.password
      })
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert('Account Created Successfully ', 'success');
    } else {
      props.showAlert('Invalid Credentials ', 'warning');
    }
  };

  const handleInputChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setCred((prevState) => ({ ...prevState, password }));
    if (cred.confirmPassword !== password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setCred((prevState) => ({ ...prevState, confirmPassword }));
    if (cred.password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  return (
    <div className='container'>
      <h2>SignUp up: </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="username" className="form-label"><strong>User Name</strong></label>
            <input type="text" className="form-control" id="username" name="username" onChange={handleInputChange} />
          </div>
          <label htmlFor="email" className="form-label"><strong>Email address</strong></label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleInputChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"><strong>Password</strong></label>
          <input type="password" className="form-control" id="password" name="password" onChange={handlePasswordChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label"><strong>Confirm Password</strong></label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handleConfirmPasswordChange} minLength={5} required />
          {error && <div className="text-danger">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
