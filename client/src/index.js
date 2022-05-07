import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from './guard/AuthGuard';
import './index.css';
//import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import NotFound from './views/NotFound';
import Protected from './views/Protected';
import Graphs from './views/Graphs';
import SelectType from './views/SelectType';
import Graph1 from './views/Graph1';
import Graph2 from './views/Graph2';
import Graph3 from './views/Graph3';
import Graph4 from './views/Graph4';


export default function App() {

  return (
    <BrowserRouter>
      <AuthGuard>
        <Routes>
          <Route path="/">
            <Route index element={<Graphs />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="protected" element={<Protected />} />
            <Route path="graphs" element={<Graphs />} />
            <Route path="type" element={<SelectType />} />
            <Route path="graph1" element={<Graph1 />} />
            <Route path="graph2" element={<Graph2 />} />
            <Route path="graph3" element={<Graph3 />} />
            <Route path="graph4" element={<Graph4 />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
