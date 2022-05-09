import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Trash } from "react-bootstrap-icons";
import * as axios from 'axios';
import '../App.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';


function Graphs() {

    const [errorMessage, setErrorMessage] = useState("")
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

    function refreshPage(){ 
        window.location.reload(); 
    }

    async function deleteGraph(number) {

        const numberData = {
            number: number
        }

        try {
            const res = await fetch("http://localhost:8080/delete", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(numberData)
            })
            const data = await res.json()
            setErrorMessage(data.message)
        } catch (err) {
            setErrorMessage(err)
        }
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
                                <th>Graph #</th>
                                <th>Type</th>
                                <th>Creation Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                graphData.map((graph, index) => {
                                    return <tr key={index}>
                                        <td>{graph.number}</td>
                                        <td>{graph.type}</td>
                                        <td>{graph.time}</td>
                                        <td>
                                            <button className="btn btn-primary px-3 mx-2">
                                                <Link to={"/viewer?graphId=" + graph.graphNumber}>Open</Link>
                                            </button>
                                            <button className="btn btn-danger" onClick={(e)=> {deleteGraph(graph.number); refreshPage();}}>
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