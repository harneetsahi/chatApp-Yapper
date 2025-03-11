import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JoinRoom from "./pages/JoinRoom";
import { useEffect, useRef } from "react";

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <div className="bg-slate-900 text-amber-50 h-screen w-screen">
        {/* <Routes>
            <Route path="/" element={<JoinRoom />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes> */}
        <Dashboard />
      </div>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
