import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/LogoPDMU.jpeg";
import ruta from "../assets/Ruta.png";

function Home() {
  const navigate = useNavigate();

  const handleInscribete = () => {
    navigate("/formulario");
  };

  const whatsappNumber = "522711734027";
  const whatsappMessage = "Hola, quiero más información sobre la carrera";

  const handleWhatsapp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-date">9 Noviembre</div>
      </div>

      {/* Logo circular debajo de la fecha */}
      <img src={logo} alt="Pentathlon Logo" className="home-logo-circle" />

      {/* Texto en la posición del logo anterior */}
      <h1 className="home-title">Carrera por el Pentathlón Deportivo Militarizado Universitario</h1>
      
      <p className="home-text">
        El Pentathlón Deportivo Militarizado Universitario te invita a la primera edición de la carrera organizada.
      </p>

      <button className="home-button" onClick={handleInscribete}>
        Inscríbete
      </button>
      <button className="home-button home-whatsapp-button" onClick={handleWhatsapp}>
        Contactar por WhatsApp
      </button>

      <img src={ruta} alt="Ruta de la carrera" className="home-route" />
    </div>
  );
}

export default Home;
