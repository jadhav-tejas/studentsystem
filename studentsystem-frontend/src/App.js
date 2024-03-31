import logo from "./logo.svg";
import "./App.css";
import Appbar from "./Components/AppBar";
import Student from "./Components/Student";
import { DisplayStudents } from "./Components/DisplayStudents";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Appbar />
        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/get-students" element={<DisplayStudents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
