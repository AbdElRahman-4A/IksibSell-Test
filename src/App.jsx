import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./Components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
            path="/"
          />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
