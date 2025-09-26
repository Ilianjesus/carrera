import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleInscribete = () => {
    navigate("/formulario");
  };

  // Número de WhatsApp del organizador
  const whatsappNumber = "522711734027"; // <-- cámbialo al tuyo
  const whatsappMessage = "Hola, quiero más información sobre la carrera";

  const handleWhatsapp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Detalles de la Carrera</h1>
      <p className="home-text">
        Bienvenido a la página oficial de inscripción a la carrera. Aquí encontrarás toda la información sobre el evento.
      </p>

      <button className="home-button" onClick={handleInscribete}>
        Inscríbete
      </button>
      <button className="home-button home-whatsapp-button" onClick={handleWhatsapp}>
        Contactar por WhatsApp
      </button>
    </div>
  );
}

export default Home;
