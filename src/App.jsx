// import { Route, Routes } from "react-router-dom";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Monprofil from "./pages/monprofil/monprofil";

function App() {
  return (
    <>
      <Navbar />
      <Monprofil />
      {/* <Routes>
    </Routes> */}
    </>
  );
}

export default App;
