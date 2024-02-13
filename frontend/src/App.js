import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Home from './components/Home.js';
import Sandbox from './components/Sandbox.js';
import Programs from './components/Programs.js';
import WelcomeScreen from './components/WelcomeScreen.js';
import "./App.css";

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(() => {
    // Retrieve the showWelcomeScreen state from sessionStorage
    const storedState = sessionStorage.getItem('showWelcomeScreen');
    return storedState ? JSON.parse(storedState) : true; // Default to true if not found
  });

  const handleGetStarted = () => {
    setShowWelcomeScreen(false);
  };

  useEffect(() => {
    // Store the showWelcomeScreen state in sessionStorage
    sessionStorage.setItem('showWelcomeScreen', JSON.stringify(showWelcomeScreen));
  }, [showWelcomeScreen]);

  return (
    <Router>
      {showWelcomeScreen ? (
        <header className="App-header">
          <WelcomeScreen handleGetStarted={handleGetStarted} />
        </header>
      ) : (
        <>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/programs">
                programer
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/programs">
                  programs
                </Nav.Link>
                <Nav.Link as={Link} to="/sandbox">
                  sandbox
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/programs" element={<Programs/>} />
            <Route path="/sandbox" element={<Sandbox/>} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
