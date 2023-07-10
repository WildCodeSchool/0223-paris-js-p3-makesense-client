// import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Monprofil from "./pages/monprofil/monprofil";
// import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CreationGuide from "./pages/CreationGuide/CreationGuide";

function App() {
  return (
    <>
      <Navbar />
      <Monprofil />
      {/* <Routes>
    </Routes> */}
      {/*  <Router>
       <Routes> */}
      {/* <Navbar /> */}
      <Home />
      <CreationGuide />
      {/* </Routes>
    </Router> */}
    </>
  );
}

export default App;
