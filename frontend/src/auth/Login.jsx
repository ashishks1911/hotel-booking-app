import React, { useContext, useState } from 'react'
import { loginUser } from '../utils/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../store/AuthProvider';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState();

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const auth = useContext(authContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login)
    if (success) {
      const token = success.jwt;
      auth.handleLogin(token)
      navigate('/')
    }
    else {
      setErrorMessage('Invalid Username or password. Please try again. ')
    }
    setTimeout(() => {
      setErrorMessage('')
    }, 3000)
  }

  return (
    <div className='container col-6 mt-5 mb-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <label htmlFor="email" className=" col-form-label">Email</label>
          <input type="email" id="email" name='email' className="form-control" value={login.email} onChange={handleInputChange} />
        </div>
        <div className='row mb-3'>
          <label htmlFor="password" className="col-form-label">Password</label>
          <input type="password" id="password" name='password' className="form-control" value={login.password}
            onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Don't have an account yet? <Link to={"/signup"}>SignUp</Link>
          </span>
        </div>
      </form>

    </div>
  )
}

export default Login
