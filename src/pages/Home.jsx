import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Formulario.css";
import logo from "../assets/LogoPDMU.jpeg";
import ruta from "../assets/Ruta3.png";
import ruta1k from "../assets/Ruta1k.png";
import { FaWhatsapp } from "react-icons/fa";
import LogoCarreraSF from "../assets/LogoCarreraSF.png";

function Home() {
  const navigate = useNavigate();

  const handleInscribete = () => {
    navigate("/formulario");
  };

  const whatsappNumber = "522714120511";
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
  ¡Prepárate para la <strong>1.ª Gran Carrera del Pentathlón!</strong><br /><br />
  Este <strong>9 de noviembre</strong> a las <strong>7:00 a.m.</strong>, vive una experiencia única llena de emoción, energía y espíritu deportivo en la <strong>Arena Córdoba</strong>.<br /><br />
  🏃‍♂️ <strong>Distancias:</strong> 5 km y 1 km<br />
  💵 <strong>Inscripción:</strong> $250<br />
  🎽 Incluye playera, número, medalla e hidratación.<br /><br />
  🏆 <strong>Premiación:</strong><br />
  🥇 1er lugar – $1,500<br />
  🥈 2do lugar – $1,000<br />
  🥉 3er lugar – $500 <br />
  (Categoria 5km, ambas ramas)<br /><br />
  ¡No lo pienses más! Inscríbete y vive la emoción de correr junto a verdaderos campeones.
</p>


      <h1 className="home-title"> Ruta 5km</h1>
      <img src={ruta} alt="Ruta de la carrera" className="home-route" />
      <br />
      <br />
      <h1 className="home-title"> Ruta 1km</h1>
      <img src={ruta1k} alt="Ruta de la carrera" className="home-route" />

            {/* Footer de contacto del desarrollador */}
      <footer className="home-footer">
        <p>¿Te gusta esta página? Contáctame como desarrollador:</p>
        <p className="footer-copy"> {new Date().getFullYear()} Ing. de Software Ilian Orduña</p>
        <div className="footer-buttons">
          <a
            href="mailto:ilian.orduna@example.com"
            className="footer-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
          <a
            href="https://wa.me/522711734027?text=Hola%20Ilian,%20me%20gustó%20tu%20trabajo"
            className="footer-btn whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </footer>

    </div>
  );
}

export default Home;
