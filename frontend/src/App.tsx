import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { useAuthStore } from "./store/useAuthStore";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <>
        <div className="flex h-screen justify-center items-center ">
          <Loader />
        </div>
      </>
    );

  return (
    <div data-theme={theme}>
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
