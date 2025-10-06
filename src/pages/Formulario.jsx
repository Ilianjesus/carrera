import { useState } from "react";
import "../styles/Formulario.css";
import logo from "../assets/LogoPDMU.jpeg";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Home.css";

function Formulario() {
  const [step, setStep] = useState(1); // Paso actual
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const tallas = ["XS", "S", "M", "L", "XL"];


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // IMPORTANTE: ahora handleSubmit evita enviar si estamos en paso 1
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Si el submit ocurre en el paso 1, solo avanza
    if (step === 1) {
      setStep(2);
      return;
    }
  
    // Evitar doble envío
    if (isSubmitting) return;
  
    setIsSubmitting(true); // 🔒 bloquea el botón
  
    try {
      const response = await fetch(import.meta.env.VITE_N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok && result.status === "success") {
        Swal.fire({
          title: "¡Inscripción exitosa! 🎉",
          html: `
            <p style="font-size:18px; color:#1B263B; margin-bottom:10px;">
              <strong>¡Felicidades, ${formData.nombreCompleto}!</strong>
            </p>
            <p style="color:#1B263B;">
              Has concluido tu registro correctamente. <br />
              Preséntate el día <strong>8 de Noviembre</strong> con tu folio para recoger tu kit 🎽 <br />
              ¡Nos vemos en la carrera! 🏃‍♀️🏅
            </p>
          `,
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
        setStep(1);
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
    } finally {
      setIsSubmitting(false); // 🔓 libera el botón
    }
  };
  

  const whatsappNumber = "522711033134";
  const whatsappMessage =
    "Hola, me gustaria adquirir un folio para inscribirme a la carrera!";

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

      {/* El form mantiene onSubmit, pero handleSubmit evita el envío en step 1 */}
      <form className="formulario-form" onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h2 className="formulario-section-title">Validación</h2>

            <input
              type="text"
              name="folio"
              placeholder="Folio"
              value={formData.folio}
              onChange={handleChange}
              // Evita que Enter envíe el formulario; en su lugar avanza al paso 2
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setStep(2);
                }
              }}
              className="formulario-input"
              required
            />

            <small style={{ color: "#1B263B", marginBottom: "0.5rem" }}>
              Si aún no cuentas con un folio para inscribirte en la carrera,
              puedes adquirirlo contactándote con el organizador usando el boton de WhatsApp que se encuentra a continuacion:
            </small>

            <button
              type="button"
              className="formulario-whatsapp-button"
              onClick={handleWhatsapp}
            >
              <FaWhatsapp className="icon" /> Contactar por WhatsApp
            </button>
                        

            <div className="home-buttons">
            <button
              type="button" // continuar no envía, sólo cambia de paso
              className="btn-primary"
              onClick={() => setStep(2)}
              disabled={!formData.folio}
            >
              Continuar
            </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="formulario-section-title">Datos Personales</h2>

            <input
              type="text"
              name="nombreCompleto"
              placeholder="Nombre completo"
              value={formData.nombreCompleto}
              onChange={(e) => {
                // Solo letras, espacios y tildes
                const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                setFormData({ ...formData, nombreCompleto: value });
              }}
              className="formulario-input"
              required
            />


            <label htmlFor="fechaNacimiento" className="formulario-label">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="formulario-input"
              max={new Date().toISOString().split("T")[0]} // hoy como fecha máxima
              required
            />



            <select
              name="rama"
              value={formData.rama}
              onChange={handleChange}
              className="formulario-select"
              required
            >
              <option value="">Selecciona tu rama</option>
              <option value="Varonil">Varonil</option>
              <option value="Femenil">Femenil</option>
            </select>

            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={(e) => {
                // Solo números y máximo 10 dígitos
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData({ ...formData, telefono: value });
              }}
              className="formulario-input"
              required
            />


            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              className="formulario-input"
              required
            />
                        <input
              type="text"
              name="contactoEmergenciaNombre"
              placeholder="Nombre de contacto de emergencia"
              value={formData.contactoEmergenciaNombre}
              onChange={handleChange}
              className="formulario-input"
              required
            />

            <input
              type="tel"
              name="contactoEmergenciaTelefono"
              placeholder="Teléfono de contacto de emergencia"
              value={formData.contactoEmergenciaTelefono}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData({ ...formData, contactoEmergenciaTelefono: value });
              }}
              className="formulario-input"
              required
            />


            <textarea
              name="condicionesMedicas"
              placeholder="Condiciones médicas relevantes (opcional)"
              value={formData.condicionesMedicas}
              onChange={handleChange}
              className="formulario-textarea"
            />

            <h2 className="formulario-section-title">Datos de la Carrera</h2>

            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="formulario-select"
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="1k">1k</option>
              <option value="5k">5k</option>
            </select>

            <select
              name="tallaPlayera"
              value={formData.tallaPlayera}
              onChange={handleChange}
              className="formulario-select"
              required
            >
              <option value="" disabled hidden>
                Selecciona tu talla de playera
              </option>
              {tallas.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>


            <div className="home-buttons">
              <button
                type="button"
                className="btn-primary2"
                onClick={() => setStep(1)}
              >
                Atrás
              </button>

              {/* Este botón hace submit del form y aquí handleSubmit sí enviará */}
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting} // deshabilita mientras se envía
              >
                {isSubmitting ? "Enviando..." : "Enviar Inscripción"}
              </button>

            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Formulario;
