import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import NavBar from "./Components/NavBar";
import Edit from "./Pages/Edit";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/transactions" element={<Index />}></Route>
            <Route path="/transactions/new" element={<New />}></Route>
            <Route path="/transactions/:index" element={<Show />}></Route>
            <Route path="/transactions/:index/edit" element={<Edit />}></Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
