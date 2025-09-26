import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
