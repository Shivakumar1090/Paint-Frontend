import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import "./App.css";
import Login from "./components/Login";
import Paint from "./components/Paint"
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
  
function App() {
  const [isAuth, setIsAuth] = useState(
    window.localStorage.getItem("isAuth") || false
  );
  return (
    <div className="App">
      <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route exact path="/" element={<Login  isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route exact path="/signup" element ={<Signup isAuth={isAuth} setIsAuth={setIsAuth}/>} />
          <Route exact path="/paint" element={<Paint isAuth={isAuth}/>} />
        </Routes>
      </Router>
    </div>
  );
}
  
export default App;
