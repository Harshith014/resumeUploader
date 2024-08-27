/**
 * The function `AppContent` renders a responsive navigation bar with login, register, profile, resume upload, and logout functionality based on user authentication status.
 * @returns The code snippet is a React application that defines a functional component `AppContent` and exports a default function `App`.
 */
import { AppBar, Button, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Routes,
  useNavigate
} from "react-router-dom";
import Login from "./components/Login";
import UserProfile from "./components/Profile";
import Register from "./components/Register";
import ResumeUploader from "./components/Resume";

function AppContent() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  /**
   * The function `renderNavButtons` conditionally renders navigation buttons based on the user's login status.
   */
  const renderNavButtons = () => (
    <>
      {!isLoggedIn && (
        <>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/register">
            Register
          </Button>
        </>
      )}
      {isLoggedIn && (
        <>
          <Button color="inherit" component={RouterLink} to="/profile">
            Profile
          </Button>
          <Button color="inherit" component={RouterLink} to="/resume">
            Resume
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <IconButton edge="start" color="inherit" aria-label="menu">
              <i className="fas fa-bars" />
            </IconButton>
          ) : (
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {isLoggedIn && <RouterLink to="/resume" style={{ color: 'inherit', textDecoration: 'none' }}>YourHR</RouterLink>}
            </Typography>
          )}
          {isMobile ? (
            <div>
              {renderNavButtons()}
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {renderNavButtons()}
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/resume" element={<ResumeUploader />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}