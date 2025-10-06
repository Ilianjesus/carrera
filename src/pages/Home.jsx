import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Formulario.css";
import logo from "../assets/LogoPDMU.jpeg";
import ruta from "../assets/Ruta3.png";
import { FaWhatsapp } from "react-icons/fa";
import LogoCarreraSF from "../assets/LogoCarreraSF.png";

function Home() {
  const navigate = useNavigate();

  const handleInscribete = () => {
    navigate("/formulario");
  };

  const whatsappNumber = "522711734027";
  const whatsappMessage = "Hola, podria brindarme información sobre la carrera";

  const handleWhatsapp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="home-container">
      <div className="home-header">
      </div>

      {/* Logo circular debajo de la fecha */}
      <div className="formulario-header">
      <img src={logo} alt="Pentathlon Logo" className="home-logo-circle" />
      <h1 className="home-title"> 9 Noviembre Carrera PDMU </h1>
      </div>

      <div className="home-buttons">
      <button className="btn-primary" onClick={handleInscribete}>
      <span>✨Inscríbete</span>
      </button>

      <button type="button" className="btn-whatsapp" onClick={handleWhatsapp}>
      <FaWhatsapp className="icon" />
      <span>WhatsApp</span>
      </button>
      </div>
      <img src={LogoCarreraSF} alt="Carrera Logo" className="home-logo-carrera"/>
      {/* Texto en la posición del logo anterior */}



      
      <p className="home-text">
  ¡Prepárate para la 1.ª Gran Carrera del Pentathlón!<br /><br />
  Este 9 de noviembre, vive una experiencia única llena de emoción, energía y espíritu deportivo.<br /><br />
  ¡Acepta el reto! Corre 5 km, 10 km o participa en la caminata recreativa.<br /><br />
  Inscripción general de $250 e incluye un kit completo para la carrera.<br /><br />
  Al finalizar la carrera, se realizará la premiación para los primeros lugares.<br /><br />
  ¡No lo pienses más! Inscríbete y vive la emoción de correr junto a verdaderos campeones.
</p>




      <h1 className="home-title"> Ruta</h1>
      <img src={ruta} alt="Ruta de la carrera" className="home-route" />
    </div>
  );
}

export default Home;
