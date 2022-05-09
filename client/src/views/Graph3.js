import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router';


function Graph3() {

    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate();

    async function script3(e) {
        e.preventDefault()

        const form = e.target;
        const city = {
            city: form[0].value
        }

        try {
            const res = await fetch("http://localhost:8080/python3", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(city)
            })
            const data = await res.json()
            navigate('/graphs')
            setErrorMessage(data.message)
        } catch (err) {
            setErrorMessage(err)
        }
    }

    const clearLocalStorage = () => {
        localStorage.clear();
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
                                <div class="card-body p-7">
                                    <h1 class="fs-4 card-title fw-bold mb-4 text-left align-items-center d-flex">
                                        <button type="submit" class="btn btn-primary ms-left">
                                            <Link to={"/graphs"}>Back</Link>
                                        </button>

                                        <button type="submit" class="btn btn-primary ms-auto" onClick={clearLocalStorage}><Link to={"/login"}>Logout</Link></button>
                                    </h1>
                                    <section>

                                        <div class="mb-2">
                                            <h4 class="mb-2" for="title">Region Name:</h4>

                                        </div>
                                        <form onSubmit={(e) => script3(e)}>
                                            <div>
                                                <input type="text" class="form-control"></input>
                                            </div>
                                            <div class="mt-2">
                                                <h5 class="mb-2" for="title">Choices:</h5>
                                            </div>
                                            <table>
                                                <tr>Denver &ensp; London</tr>
                                                <tr>Seattle &ensp; New York</tr>
                                                <tr>Austin &ensp; San Diego</tr>
                                            </table>
                                            <div class="align-items-center d-flex mb-3">
                                                <button type="submit" class="btn btn-primary ms-auto my-2">
                                                    Create
                                                </button>
                                            </div>
                                        </form>

                                    </section>
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

export default Graph3;
