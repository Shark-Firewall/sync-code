import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="*" element={<h1>404! Page Not Found!</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
