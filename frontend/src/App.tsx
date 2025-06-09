import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import { useAuthStore } from "./store/useAuthStore";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { themeClass } from "./lib/ThemeClass";
import Dashboard from "./pages/Dashboard";
import UpdateProfilePage from "./pages/UpdateProfile";
import UpdatePasswordPage from "./pages/UpdatePassword";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <>
        <div className="h-screen flex justify-center items-center ">
          <Loader />
        </div>
      </>
    );

  return (
    <div className={`${themeClass}  min-h-screen  selection:bg-indigo-700/40 `}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={!authUser ? <Home /> : <Navigate to="/dashboard" />}
          ></Route>
          <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to="/signin" />}
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
            path="/updateProfile"
            element={
              authUser ? <UpdateProfilePage /> : <Navigate to="/signin" />
            }
          ></Route>
          <Route
            path="/updatePassword"
            element={
              authUser ? <UpdatePasswordPage /> : <Navigate to="/signin" />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
