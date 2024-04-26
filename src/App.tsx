
import {
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
    </div>
  );
}

export default App;
