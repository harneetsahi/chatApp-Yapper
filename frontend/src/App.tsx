import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import { useAuthStore } from "./store/useAuthStore";

import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { themeClass } from "./lib/ThemeClass";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <>
        <div className="flex  justify-center items-center ">
          <Loader />
        </div>
      </>
    );

  return (
    <div className={`${themeClass} min-h-screen`}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/signin" />}
          ></Route>
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/signin" />}
          ></Route>
          <Route
            path="/signin"
            element={!authUser ? <Signin /> : <Navigate to="/dashboard" />}
          ></Route>
          <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to="/signin" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
