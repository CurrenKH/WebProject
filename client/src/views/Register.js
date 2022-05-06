import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useState, useLayoutEffect } from "react";
import { useNavigate } from 'react-router';

function Register () {

    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")

    async function handleRegister(e) {
        e.preventDefault()

        const form = e.target
        const user = {
            username: form[0].value,
            password: form[1].value,
            confirmPassword: form[2].value,
            firstName: form[3].value,
            lastName: form[4].value
        }

        try {
            const res = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            navigate('/login')
            setErrorMessage(data.message)
        } catch (err) {
            setErrorMessage(err)
        }
    }



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
                                    <h1 class="fs-4 card-title fw-bold mb-4 text-center">Register</h1>

                                    
                                    <form onSubmit={(e) => handleRegister(e)}>
                                        <div class="mb-2">
                                            <label class="mb-2" for="username">Username</label>
                                            <input id="username" type="text" class="form-control" name="username"></input>
                                        </div>

                                        <div class="mb-2">
                                            <label class="mb-2" for="password">Password</label>
                                            <input id="password" type="password" class="form-control" name="password"></input>
                                        </div>

                                        <div class="mb-2">
                                            <label class="mb-2" for="reenterpassword">Reenter Password</label>
                                            <input id="reenterpassword" type="password" class="form-control" name="reenterpassword"></input>
                                        </div>

                                        <div class="mb-2">
                                            <label class="mb-2" for="firstname">First Name</label>
                                            <input id="firstname" type="text" class="form-control" name="firstname"></input>
                                        </div>

                                        <div class="mb-2">
                                            <label class="mb-2" for="lastname">Last Name</label>
                                            <input id="lastname" type="text" class="form-control" name="lastname"></input>
                                        </div>

                                        <p class="form-text text-muted mb-3">
                                            By registering you agree with our terms and conditions.
                                        </p>

                                        <div class="align-items-center d-flex">
                                            <button type="submit" class="btn btn-primary ms-auto" value="Register">
                                                Signup
                                            </button>
                                        </div>
                                    </form>


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
export default Register