import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Works from "./pages/Works";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgeVerification from "./components/AgeVerification";
import Browse from "./pages/Browse";
import './App.css';
import AboutUs from "./pages/AboutUs";
function App() {
  
  return (
    <Router>
      <Navbar />
      <AgeVerification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/how-it-works" element={<Works />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
