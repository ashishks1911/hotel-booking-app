import React, { useState } from 'react'
import { registerUser } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'

const signUp = () => {
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value })
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await registerUser(signUp)
      setSuccessMessage("Congratulations, your account has been successfully created.")
      setErrorMessage("")
      setSignUp({ firstName: "", lastName: "", email: "", password: "" })
    } catch (error) {
      setSuccessMessage("")
      setErrorMessage(`SignUp error : ${error.message}`)
    }
    setTimeout(() => {
      setErrorMessage("")
      setSuccessMessage("")
    }, 5000)
  }

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {successMessage && <p className="alert alert-success">{successMessage}</p>}

      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-3 row">
          <label htmlFor="firstName" className="col-sm-3 col-form-label">
            first Name
          </label>
          <div className="col-sm-9">
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              value={signUp.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="lastName" className="col-sm-3 col-form-label">
            Last Name
          </label>
          <div className="col-sm-9">
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              value={signUp.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-3 col-form-label">
            Email
          </label>
          <div className="col-sm-9">
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={signUp.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-3 col-form-label">
            Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={signUp.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
            Register
          </button>
          <span style={{ marginLeft: "10px" }}>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </div>
      </form>
    </section>
  )
}

export default signUp
