import "./App.css";
import Login from "./Components/Login";
import Editor from "./Components/Editor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


function App() {


  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "success",
              },
            },
          }}
        ></Toaster>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/editor/:roomId" element={<Editor />} />
          <Route path="*" element={<h1>404! Page Not Found!</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
