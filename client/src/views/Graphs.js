import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash } from "react-bootstrap-icons";
import * as axios from 'axios';
import '../App.css';
import { useEffect, useState } from "react";


function Graphs() {
    const [graphData, setGraphData] = useState([])
    // useEffect is called upon page load
    useEffect(() => {
        async function fetchGraphData() {
            const response = await axios.get('http://localhost:8080/graphs')
            console.log('response', response.data) //OK
            setGraphData(response.data); // set graph data to data receieved
        }
        fetchGraphData()
    }, [])

    const clearLocalStorage = () => {
        localStorage.clear();
    }

    return (
        <div className="App">
            <header className="App-full">
                <div className="horizontal d-flex align-items-center">
                    <h1 className="m-4">
                        Your graphs
                    </h1>
                    <div>
                        <button type="button" className="btn btn-success btn-lg"><Link to="/type">Create new</Link></button>
                        <button className="top-right btn btn-secondary btn-lg mx-2" onClick={clearLocalStorage}><Link to={"/login"}>Logout</Link></button>
                    </div>
                </div>
                <section>
                    <table className="table text-white">
                        <thead>
                            <tr>
                                <th>Graph name</th>
                                <th>Graph type</th>
                                <th>Creation date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                graphData.map((graph, index) => {
                                    return <tr key={index}>
                                        <td>{graph.name}</td>
                                        <td>{graph.graphType}</td>
                                        <td>{graph.creationDate}</td>
                                        <td>
                                            <button className="btn btn-primary px-3 mx-2">
                                                <Link to={"/login?graphId=" + graph.graphId}>Open</Link>
                                            </button>
                                            <button className="btn btn-danger">
                                                <Trash></Trash>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </section>
            </header>
        </div>
    );
}
export default Graphs;