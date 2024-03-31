import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Idverification from './Components/Authentification/Idverification/Idverification';
import Login from './Components/Authentification/Login/Login';
import Signup from './Components/Authentification/SignUp/Signup';
import { UserProvider } from './Components/Authentification/Login/UserContext';
import Projet from './Components/Projet/Projet';



const App = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <UserProvider>
        <div className='App'>
          <Routes>
            <Route
              exact
              path="/"
              element={isLoggedIn === "true" ? <Signup /> : <Login />}
            />
            <Route path="/idverifivation" element={<Idverification />} />
            <Route path="/registre" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Projet" element={<Projet />} />


          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
