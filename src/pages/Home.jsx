import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Formulario.css";
import logo from "../assets/LogoPDMU.jpeg";
import ruta from "../assets/Ruta2.png";
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
  ¡Llega la 1.ª Gran Carrera del Pentathlón!<br /><br />
  Este 9 de noviembre, vive la emoción de correr en la primera edición de la carrera organizada por el Pentathlón Deportivo Militarizado Universitario.<br /><br />
  Elige tu reto: 5 km, 10 km o caminata recreativa, y disfruta de un recorrido lleno de energía, disciplina y espíritu de equipo.<br /><br />
  ¡No te lo puedes perder! Inscríbete y forma parte de esta gran experiencia.
</p>



      <h1 className="home-title"> Ruta</h1>
      <img src={ruta} alt="Ruta de la carrera" className="home-route" />
    </div>
  );
}

export default Home;
