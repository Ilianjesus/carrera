import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleInscribete = () => {
    navigate("/formulario");
  };

  // Número de WhatsApp del organizador en formato internacional
  const whatsappNumber = "522711734027"; // <-- cámbialo al tuyo
  const whatsappMessage = "Hola, quiero más información sobre la carrera";

  const handleWhatsapp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank"); // abre en nueva pestaña
  };

  return (
    <div>
      <h1>Detalles de la Carrera</h1>
      <p>
        Bienvenido a la página oficial de inscripción a la carrera. 
        Aquí encontrarás toda la información sobre el evento.
      </p>

      <button onClick={handleInscribete}>Inscríbete</button>
      <button onClick={handleWhatsapp}>Contactar por WhatsApp</button>
    </div>
  );
}

export default Home;
