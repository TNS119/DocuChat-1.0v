import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./components/HomePage"
import Chatpage from "./components/Chatpage"
import LoginPage from "./components/Loginpage"
import RegisterPage from "./components/Registerpage"
import './App.css';
import { buildApiUrl } from './api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await fetch(buildApiUrl("/auth/me"), {
          credentials: "include"
        });
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  if (loading) {
    return <div className="App" />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/chat" element={isAuthenticated ? <Chatpage /> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;


