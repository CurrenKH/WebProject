import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useState, useLayoutEffect } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router';

function Login() {

  const [errorMessage, setErrorMessage] = useState("")
  let navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault()

    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      localStorage.setItem("token", data.token)
      navigate('/graphs')
      setErrorMessage(data.message)
    } catch (err) {
      setErrorMessage(err)
    }
  }

  useLayoutEffect(() => {
    fetch("/login", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => data.isLoggedIn)
      .catch(err => setErrorMessage(err))
  }, [])

  return (
    <body>
      <section class="h-100">
        <div class="container h-100">
          <div class="row justify-content-sm-center h-100">
            <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div class="text-center my-5">
                <img src="https://images-platform.99static.com//y50FdI4Or7filffZ5qSXAn5YMTI=/0x0:2000x2000/fit-in/500x500/projects-files/71/7131/713106/ec5bd3a0-f210-4729-ae13-51241c5657eb.jpg" alt="logo" width="100"></img>
              </div>
              <div class="card shadow-lg">
                <div class="card-body p-5">
                  <h1 class="fs-4 card-title fw-bosld mb-4 text-center">Login</h1>


                  <form onSubmit={(e) => handleLogin(e)}>
                    <div class="mb-3">
                      <label class="mb-2" for="username">Username</label>
                      <input id="username" type="text" class="form-control" name="username"></input>
                    </div>
                    <div class="mb-3">
                      <label class="mb-2" for="password">Password</label>
                      <input id="password" type="password" class="form-control" name="password"></input>
                    </div>
                    <div class="align-items-center d-flex">
                      <button type="submit" class="btn btn-primary ms-auto" value="Login">
                        Login
                      </button>

                    </div>
                  </form>


                </div>
                <div class="card-footer py-3 border-0">
                  <div class="text-center">
                    New user? <button type="submit" class="btn btn-primary ms-auto">
                      <Link to={"/register"}>Register</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div class="text-center mt-5 text-muted">
                Copyright &copy; 2022 &mdash; Graphs Inc.
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}
export default Login;