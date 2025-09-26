import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
