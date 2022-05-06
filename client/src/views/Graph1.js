import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as axios from 'axios';

//const pythonScript = require('./services/python.service');


function Graph1() {

/*     const Dropdown = ({ label, value, options, onChange }) => {
        return (
            <label>
                {label}
                <select value={value} onChange={onChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </label>
        );
    };
    
    const [userData, setUserData] = useState({});
    
    // Hook called upon loading the component
    useEffect(() => {
        async function fetchData() {
            // GET request using axios inside useEffect React hook
            const response = await axios.get('http://localhost:8080/login')
            // console.log('response: ', response);
            if (response.data) {
                setUserData(response.data)
            }
        }
        fetchData();
    }, []); */

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

                                        <div class="mb-2">
                                            <label class="mb-2" for="username">Coupon use per region</label>

                                        </div>
                                        <section>
                                            <div>
                                                {/* <Dropdown label="Filter data: "></Dropdown> */}
                                                <input type="text" ></input>
                                                <button className='btn btn-primary' >Filter</button>
                                            </div>
                                        </section>

                                        <button type="submit" class="btn btn-primary ms-left" /*onClick={pythonScript.startPythonScript()}*/>
                                            Create
                                        </button>

                                        <button type="submit" class="btn btn-primary ms-auto">
                                            <Link to={"/login"}>Logout</Link>
                                        </button>
                                    </h1>
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

export default Graph1;
