import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Chatpage from "./components/Chatpage";
import LoginPage from "./components/Loginpage";
import RegisterPage from "./components/Registerpage";
import "./App.css";
import { buildApiUrl, createAuthFetch } from "./api";

function App() {
  // checking | authenticated | unauthenticated
  const [authStatus, setAuthStatus] = useState("checking");

  const navigate = useNavigate();

  const authFetch = useMemo(
    () =>
      createAuthFetch(
        (authenticated) =>
          setAuthStatus(
            authenticated ? "authenticated" : "unauthenticated"
          ),
        navigate
      ),
    [navigate]
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(buildApiUrl("/auth/me"), {
          credentials: "include",
        });

        if (response.ok) {
          setAuthStatus("authenticated");
        } else {
          setAuthStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthStatus("unauthenticated");
      }
    };

    checkAuth();
  }, []);

  // Show splash screen while backend wakes up
  if (authStatus === "checking") {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <h1>DOCUCHAT</h1>

          <div className="loader" />

          <p>Checking your session...</p>

          <small>
            The server may take up to a minute to
            start.Please wait...
          </small>
        </div>
      </div>
    );
  }

  const isAuthenticated = authStatus === "authenticated";

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage
                setIsAuthenticated={() =>
                  setAuthStatus("authenticated")
                }
              />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPage />
            )
          }
        />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage authFetch={authFetch} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/chat"
          element={
            isAuthenticated ? (
              <Chatpage authFetch={authFetch} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;