// import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CreationGuide from "./pages/CreationGuide/CreationGuide";

function App() {
  return (
    <>
      {/*  <Router>
       <Routes> */}
      <Navbar/>
      <Footer/>
      {/* </Routes>
    </Router> */}
    </>
  );
}

export default App;
