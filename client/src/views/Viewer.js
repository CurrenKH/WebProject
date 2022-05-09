import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link, useSearchParams } from "react-router-dom";


function Viewer() {

    const [searchParams, setSearchParams] = useSearchParams()
    const graphId = searchParams.get("graphId")
    console.log('graphId: ', graphId);

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

                                        <button type="submit" class="btn btn-primary ms-auto" onClick={clearLocalStorage}>
                                            <Link to={"/login"}>Logout</Link>
                                        </button>
                                    </h1>
                                    <section>
                                        <table class="center mr-10">
                                            <div>
                                                <div class="row">
                                                    <div class="col-md-6"></div>

                                                    <a href="http://localhost:3000/viewer">
                                                        <img src="http://localhost:8080/static/graphs/type1/6177.jpg" width="360"></img>
                                                    </a>
                                                </div>
                                            </div>
                                        </table>
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

export default Viewer;
