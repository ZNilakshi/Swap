import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgeVerification from "./components/AgeVerification";
import Browse from "./pages/Browse";
import './App.css';

function App() {
  
  return (
    <Router>
      <Navbar />
      <AgeVerification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
