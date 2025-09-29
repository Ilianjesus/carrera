import { useState } from "react";
import "../styles/Formulario.css";
import logo from "../assets/LogoPDMU.jpeg";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";

function Formulario() {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    fechaNacimiento: "",
    rama: "",
    telefono: "",
    correo: "",
    categoria: "",
    tallaPlayera: "",
    contactoEmergenciaNombre: "",
    contactoEmergenciaTelefono: "",
    condicionesMedicas: "",
    folio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch( import.meta.env.VITE_N8N_WEBHOOK,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log(result);
  
      if (response.ok && result.status === "success") {
        Swal.fire({
          title: "¡Inscripción exitosa! 🎉",
          text: result.message,
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#1B263B",
        });
        setFormData({
          nombreCompleto: "",
          fechaNacimiento: "",
          rama: "",
          telefono: "",
          correo: "",
          categoria: "",
          tallaPlayera: "",
          contactoEmergenciaNombre: "",
          contactoEmergenciaTelefono: "",
          condicionesMedicas: "",
          folio: "",
        });
      } else {
        Swal.fire({
          title: "Error ❌",
          text: result.message,
          icon: "error",
          confirmButtonText: "Reintentar",
          confirmButtonColor: "#D33",
        });
      }
    } catch (error) {
      console.error("Error enviando los datos:", error);
      Swal.fire({
        title: "Error de conexión",
        text: "No se pudo enviar la inscripción",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };
  

  // Número de WhatsApp del organizador
  const whatsappNumber = "522711734027"; // <-- cámbialo por el tuyo
  const whatsappMessage =
    "Hola, quiero adquirir un folio para inscribirme a la carrera";

  const handleWhatsapp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="formulario-container">

      <div className="formulario-header">
      <h1 className="formulario-title">Formulario de Inscripción</h1>
      <img src={logo} alt="Pentathlon Logo" className="form-logo-circle" />
      </div>

      <form className="formulario-form" onSubmit={handleSubmit}>
        {/* --- Folio --- */}
        <h2 className="formulario-section-title">Validación</h2>
        <div>
          <label className="formulario-label">Folio: </label>
          <input
            type="text"
            name="folio"
            value={formData.folio}
            onChange={handleChange}
            className="formulario-input"
            required
          />
        </div>

        {/* --- Enlace para adquirir folio --- */}
        <div>
          <small style={{ color: "#1B263B", marginBottom: "0.5rem" }}>
            Si aún no cuentas con un folio para inscribirte en la carrera,
            puedes adquirirlo contactándote con el organizador a través del
            siguiente enlace:
          </small>

          <button
            style={{ marginTop: "1rem" }}
            type="button"
            className="formulario-whatsapp-button"
            onClick={handleWhatsapp}
          >
          <FaWhatsapp style={{ marginRight: "0.5rem" }} />
          Obtener folio por WhatsApp
          </button>

        </div>

        {/* --- Datos personales --- */}
        <h2 className="formulario-section-title">Datos Personales</h2>
        <div>
          <label className="formulario-label">Nombre completo: </label>
          <input
            type="text"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            className="formulario-input"
            required
          />
        </div>

        <div>
          <label className="formulario-label">Fecha de nacimiento: </label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className="formulario-input"
            required
          />
        </div>

        <div>
          <label className="formulario-label">Rama: </label>
          <select
            name="rama"
            value={formData.rama}
            onChange={handleChange}
            className="formulario-select"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Varonil">Varonil</option>
            <option value="Femenil">Femenil</option>
          </select>
        </div>

        <div>
          <label className="formulario-label">Teléfono: </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="formulario-input"
            required
          />
        </div>

        <div>
          <label className="formulario-label">Correo electrónico: </label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="formulario-input"
            required
          />
        </div>

        {/* --- Datos de la carrera --- */}
        <h2 className="formulario-section-title">Datos de la Carrera</h2>
        <div>
          <label className="formulario-label">Categoría: </label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="formulario-select"
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="5k">5k</option>
            <option value="10k">10k</option>
            <option value="Caminata">Caminata</option>
          </select>
        </div>

        <div>
          <label className="formulario-label">Talla de playera: </label>
          <select
            name="tallaPlayera"
            value={formData.tallaPlayera}
            onChange={handleChange}
            className="formulario-select"
            required
          >
            <option value="">Selecciona tu talla</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div>
          <label className="formulario-label">Contacto de emergencia (nombre): </label>
          <input
            type="text"
            name="contactoEmergenciaNombre"
            value={formData.contactoEmergenciaNombre}
            onChange={handleChange}
            className="formulario-input"
            required
          />
        </div>

        <div>
          <label className="formulario-label">Contacto de emergencia (teléfono): </label>
          <input
            type="tel"
            name="contactoEmergenciaTelefono"
            value={formData.contactoEmergenciaTelefono}
            onChange={handleChange}
            className="formulario-input"
            required
          />
        </div>

        <div>
          <label className="formulario-label">Condiciones médicas relevantes (opcional): </label>
          <textarea
            name="condicionesMedicas"
            value={formData.condicionesMedicas}
            onChange={handleChange}
            className="formulario-textarea"
          />
        </div>

        <button type="submit" className="formulario-button">
          Enviar Inscripción
        </button>
      </form>
    </div>
  );
}

export default Formulario;
