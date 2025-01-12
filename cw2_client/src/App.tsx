import React from 'react';
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import Footer from './Components/Footer/Footer';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Dashboard from './Pages/Dashboard/Dashboard';
import NewPetition from './Pages/NewPetition/NewPetition';
import Petition from './Pages/Petition/Petition';
import ThresholdManager from './Pages/ThresholdManager/ThresholdManager';
import AuthProvider, {useAuth} from './Utils/AuthProvider';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/new_petition" element={<NewPetition />} />
              <Route path="/petition/:id" element={<Petition />} />
              <Route path="/threshold" element={<ThresholdManager />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

function Navbar() {
  const { token, logout, isAdmin } = useAuth();

  return (
    <div className="navbar">
      {token ? (<Link to="/dashboard">Dashboard</Link>) : (<></>)}
      
      {isAdmin ? (
        <>
          <Link to="/threshold">Threshold Manager</Link>
        </>
      ): (
        <></>
      )}
      <div className="rightSide">
        {token ? (
          <>
            <div className="logoutButton">
              <a onClick={() => logout()}>Logout</a>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
