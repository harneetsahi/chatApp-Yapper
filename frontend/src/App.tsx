import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JoinRoom from "./pages/JoinRoom";
import { AppProvider } from "./context/Provider";

function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <div className="bg-slate-900 text-amber-50 h-screen w-screen backdrop:ur">
            <Routes>
              <Route path="/" element={<JoinRoom />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
            {/* <Dashboard /> */}
          </div>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}

export default App;
