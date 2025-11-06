import { useState } from "react";
import "../styles/Formulario.css";
import logo from "../assets/LogoPDMU.jpeg";
import { FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Home.css";
import playeraPersonalizada from "../assets/Pers.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


function Formulario() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPersonalizacionInfo, setShowPersonalizacionInfo] = useState(false);

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    fechaNacimiento: "",
    rama: "",
    telefono: "",
    correo: "",
    categoria: "",
    tallaPlayera: "W",
    contactoEmergenciaNombre: "",
    contactoEmergenciaTelefono: "",
    condicionesMedicas: "",
    folio: "",
    personalizarPlayera: false,
    nombrePlayera: "",
  });

  const tallas = ["12 (Infantil)","14 (Infantil)","16 (Infantil)","XS", "S", "M", "L", "XL"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      const folioRegex = /^C[A-Z0-9]{8}$/; // Empieza con C + 8 caracteres alfanuméricos
  
      if (!formData.folio.trim()) {
        Swal.fire({
          title: "Campo requerido",
          text: "Debes ingresar tu folio antes de continuar.",
          icon: "warning",
          confirmButtonColor: "#1B263B",
        });
        return;
      }
  
      if (!folioRegex.test(formData.folio)) {
        Swal.fire({
          title: "Folio inválido",
          html: `
            Tu folio debe cumplir con las siguientes condiciones:
            <ul style="text-align:left;">
              <li>9 caracteres en total</li>
              <li>Solo letras mayúsculas y números</li>
            </ul>
          `,
          icon: "warning",
          confirmButtonColor: "#1B263B",
        });
        return;
      }
  
      // Mostrar confirmación para revisar el folio
      Swal.fire({
        title: "Revisa tu folio",
        html: `
          Tu folio ingresado es: <strong>${formData.folio}</strong><br/>
          Asegúrate de que esté correcto antes de continuar.
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "No, revisar",
        confirmButtonColor: "#1B263B",
        cancelButtonColor: "#D33",
      }).then((result) => {
        if (result.isConfirmed) {
          setStep(2); // Solo avanzar si confirma
        }
      });
    } else if (step === 2) {
      // Validar campos obligatorios del paso 2
      const requiredFields = [
        "nombreCompleto",
        "fechaNacimiento",
        "rama",
        "telefono",
        "correo",
        "contactoEmergenciaNombre",
        "contactoEmergenciaTelefono",
      ];
    
      const missingFields = requiredFields.filter(
        (field) => !formData[field] || formData[field].trim() === ""
      );
    
      if (missingFields.length > 0) {
        Swal.fire({
          title: "Campos incompletos",
          text: "Por favor, completa todos los campos requeridos antes de continuar.",
          icon: "warning",
          confirmButtonColor: "#1B263B",
        });
        return;
      }
    
      // Validar longitud del teléfono principal
      if (formData.telefono.length !== 10) {
        Swal.fire({
          title: "Teléfono inválido",
          text: "El número de teléfono debe contener exactamente 10 dígitos.",
          icon: "warning",
          confirmButtonColor: "#1B263B",
        });
        return;
      }
    
      // Validar longitud del teléfono de emergencia
      if (formData.contactoEmergenciaTelefono.length !== 10) {
        Swal.fire({
          title: "Teléfono de emergencia inválido",
          text: "El número de teléfono de emergencia debe contener exactamente 10 dígitos.",
          icon: "warning",
          confirmButtonColor: "#1B263B",
        });
        return;
    }

    setStep(3);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step control logic
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

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
              Has concluido tu registro correctamente.<br /><br />
              ${
                formData.personalizarPlayera
                  ? `
                    <strong>✅ Personalización confirmada:</strong><br />
                    👕 Tu playera será personalizada con la palabra:
                    <strong>${formData.nombrePlayera}</strong> <br />
                    <span style="color:#E63946;">
                      Recuerda que al haber seleccionado esta opción, te comprometes a realizar el pago adicional de 
                      <strong>$50 MXN</strong> al momento de recoger tu kit, de lo contrario no se te podrá hacer entrega de la playera.
                    </span><br /><br />
                  `
                  : ""
              }
      
              <strong>📍 Punto de entrega del kit:</strong><br />
              ☕ <strong>Punto Café Sucursal Centro</strong><br />
              Av. 3 #13, Centro, 94500 Córdoba, Ver.<br />
              🗓️ <strong>8 de noviembre</strong><br />
              ⏰ De <strong>10:00 a.m.</strong> a <strong>5:00 p.m.</strong><br /><br />
      
              <span style="color:#457B9D; font-weight:bold;">
                📸 Te recomendamos tomar una captura de pantalla de esta confirmación para cualquier aclaración futura.
              </span><br /><br />
      
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
          personalizarPlayera: false,
          nombrePlayera: "",
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
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "522714120511";
  const whatsappMessage =
    "Hola, quisiera apartar la talla de mi playera, ¿Que tallas hay aun disponibles?!";

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

      <form className="formulario-form" onSubmit={handleSubmit} translate="no">
        {/* STEP 1 - FOLIO */}
        {step === 1 && (
          <>
            <h2 className="formulario-section-title">Validación de Folio</h2>

            <input
              type="text"
              name="folio"
              placeholder="Folio"
              value={formData.folio}
              onChange={(e) => {
                // Convertir a mayúsculas y eliminar caracteres inválidos
                const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                setFormData({ ...formData, folio: value.slice(0, 9) }); // Máximo 9 caracteres
              }}
              className="formulario-input"
              required
            />


            <small style={{ color: "#1B263B", marginBottom: "0.5rem" }}>
              Si aún no cuentas con un folio para inscribirte en la carrera,
              puedes adquirirlo contactando al organizador:
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
              type="button"
              className="btn-primary"
              onClick={handleNextStep}
            >
              Continuar
            </button>

            </div>
          </>
        )}

        {/* STEP 2 - DATOS PERSONALES */}
        {step === 2 && (
          <>
            <h2 className="formulario-section-title">Datos Personales</h2>

            <input
              type="text"
              name="nombreCompleto"
              placeholder="Nombre completo"
              value={formData.nombreCompleto}
              onChange={(e) => {
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
              max={new Date().toISOString().split("T")[0]}
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
                setFormData({
                  ...formData,
                  contactoEmergenciaTelefono: value,
                });
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

        <div className="home-buttons">
          <button
            type="button"
            className="btn-primary2"
            onClick={() => setStep(1)}
          >
            Atrás
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleNextStep}
          >
            Continuar
          </button>
        </div>

          </>
        )}

        {/* STEP 3 - DATOS DE LA CARRERA */}
        {step === 3 && (
          <>
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

            {/*<select
              name="tallaPlayera"
              value={formData.tallaPlayera}
              onChange={handleChange}
              className="formulario-select"
              required
              translate="no"
            >
              <option value="" disabled hidden>
                Selecciona tu talla de playera
              </option>
              {tallas.map((t) => (
                <option key={t} value={t} translate="no">
                  {t}
                </option>
              ))}
            </select>*/}
            <p style={{color:"#1B263B", fontWeight:"600", marginTop:"1rem"}}>
              Playeras casi agotadas.<br/>
              Para verificar si aún hay de tu talla disponible envía mensaje por WhatsApp.
            </p>

            <button
              type="button"
              className="formulario-whatsapp-button"
              onClick={handleWhatsapp}
            >
              <FaWhatsapp className="icon" /> Ver disponibilidad de talla
            </button>


            <div className="formulario-checkbox-group vertical">
              <label className="formulario-checkbox-label">
                <input
                  type="checkbox"
                  name="personalizarPlayera"
                  checked={formData.personalizarPlayera}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalizarPlayera: e.target.checked,
                      nombrePlayera: e.target.checked ? formData.nombrePlayera : "",
                    })
                  }
                />
                <span className="checkbox-text">
                  Deseo <strong>personalizar mi playera</strong> (costo adicional de $50 MXN)
                </span>
              </label>
                
              <button
                type="button"
                className="btn-toggle-info"
                onClick={() => setShowPersonalizacionInfo(!showPersonalizacionInfo)}
              >
                {showPersonalizacionInfo ? "Ocultar información" : "Más información"}{" "}
                {showPersonalizacionInfo ? <FaChevronUp /> : <FaChevronDown />}
              </button>
                
              {showPersonalizacionInfo && (
                <div className="info-desplegable">
                  <p>
                    La personalización de la playera es completamente <strong>opcional</strong>.
                    Si decides no personalizarla, recibirás el mismo modelo de playera,
                    solo sin el nombre impreso.
                  </p>
                  <p>
                    Si seleccionas esta opción, deberás cubrir un <strong>costo adicional de $50 MXN </strong>
                    al momento de recoger tu kit. De no realizar el pago, no se podrá entregar la
                    playera personalizada.
                  </p>
                </div>
              )}
            </div>


            {formData.personalizarPlayera && (
            <div className="personalizacion-container">
              <input
                type="text"
                name="nombrePlayera"
                placeholder="Nombre para la playera"
                value={formData.nombrePlayera}
                onChange={(e) => {
                  // Solo letras y espacios
                  const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                
                  if (value.length > 11) {
                    Swal.fire({
                      title: "Límite alcanzado",
                      text: "El nombre para la playera solo puede tener un máximo de 11 caracteres.",
                      icon: "info",
                      confirmButtonColor: "#1B263B",
                    });
                    return; // evita actualizar el estado con texto más largo
                  }
                
                  setFormData({ ...formData, nombrePlayera: value });
                }}
                className="formulario-input"
                required
              />

              <small style={{ color: "#1B263B", fontSize: "0.85rem" }}>
                Máximo 11 caracteres
              </small>
              
              <div className="imagen-ilustrativa-container">
                <p className="imagen-ilustrativa-text">
                  Ejemplo de personalización:
                </p>
                <img
                  src={playeraPersonalizada}
                  alt="Ejemplo de playera personalizada"
                  className="imagen-ilustrativa"
                />
              </div>
            </div>
          )}



            <div className="home-buttons">
              <button
                type="button"
                className="btn-primary2"
                onClick={() => setStep(2)}
              >
                Atrás
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
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
