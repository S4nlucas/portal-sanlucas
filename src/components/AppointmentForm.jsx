import { useState } from "react";
import { createAppointmentRequest } from "../services/appointmentStorage";

const initialForm = {
  nombre: "",
  rut: "",
  telefono: "",
  email: "",
  especialidad: "",
  prevision: "",
  modalidad: "",
  fechaPreferida: "",
  horario: "",
  mensaje: "",
  aceptaPrivacidad: false,
};

const specialties = [
  "Nefrología",
  "Hemodiálisis",
  "Diálisis peritoneal",
  "Nutrición renal",
  "Medicina interna",
  "Otra consulta",
];

function AppointmentForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    type: "idle",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }

    if (status.type === "error") {
      setStatus({
        type: "idle",
        message: "",
      });
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.nombre.trim()) {
      nextErrors.nombre = "Ingrese el nombre del paciente.";
    }

    if (!form.telefono.trim()) {
      nextErrors.telefono = "Ingrese un teléfono de contacto.";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Ingrese un correo válido.";
    }

    if (!form.especialidad) {
      nextErrors.especialidad = "Seleccione una especialidad.";
    }

    if (!form.modalidad) {
      nextErrors.modalidad = "Seleccione una modalidad.";
    }

    if (!form.aceptaPrivacidad) {
      nextErrors.aceptaPrivacidad =
        "Debe autorizar el uso de los datos para gestionar la solicitud.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({
        type: "error",
        message: "Revise los campos obligatorios antes de continuar.",
      });
      return;
    }

    setStatus({
      type: "loading",
      message: "Registrando solicitud...",
    });

    try {
      createAppointmentRequest({
        nombre: form.nombre.trim(),
        rut: form.rut.trim(),
        telefono: form.telefono.trim(),
        email: form.email.trim(),
        especialidad: form.especialidad,
        prevision: form.prevision,
        modalidad: form.modalidad,
        fechaPreferida: form.fechaPreferida,
        horario: form.horario,
        mensaje: form.mensaje.trim(),
      });

      setForm(initialForm);
      setErrors({});
      setStatus({
        type: "success",
        message:
          "Solicitud registrada. La clínica se comunicará para confirmar disponibilidad.",
      });
    } catch (error) {
      console.error("Error al registrar la solicitud:", error);

      setStatus({
        type: "error",
        message:
          "No fue posible registrar la solicitud. Intente nuevamente.",
      });
    }
  };

  return (
    <section className="appointment-section" id="agenda">
      <div className="container appointment-layout">
        <div className="appointment-intro">
          <span className="eyebrow">Solicitud de atención</span>

          <h2>Solicite una hora médica</h2>

          <p>
            Complete el formulario y el equipo de la clínica se comunicará para
            confirmar disponibilidad, fecha y horario.
          </p>

          <div className="appointment-notice">
            <strong>Importante</strong>

            <span>
              El envío del formulario no confirma automáticamente una reserva.
              La hora queda agendada cuando recepción toma contacto con el
              paciente.
            </span>
          </div>

          <ul className="appointment-benefits">
            <li>Solicitud disponible las 24 horas.</li>
            <li>Confirmación directa desde recepción.</li>
            <li>Selección de especialidad y horario preferido.</li>
            <li>Canal organizado para datos de contacto.</li>
          </ul>
        </div>

        <form className="appointment-form" onSubmit={handleSubmit} noValidate>
          <div className="form-heading">
            <span>Paso 1</span>
            <h3>Datos del paciente</h3>
          </div>

          <div className="form-grid">
            <div className="form-field form-field-full">
              <label htmlFor="nombre">Nombre completo *</label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre y apellidos"
                autoComplete="name"
              />

              {errors.nombre && (
                <small className="field-error">{errors.nombre}</small>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="rut">RUT</label>

              <input
                id="rut"
                name="rut"
                type="text"
                value={form.rut}
                onChange={handleChange}
                placeholder="12.345.678-9"
              />
            </div>

            <div className="form-field">
              <label htmlFor="telefono">Teléfono *</label>

              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
                autoComplete="tel"
              />

              {errors.telefono && (
                <small className="field-error">{errors.telefono}</small>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Correo electrónico</label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="paciente@correo.cl"
                autoComplete="email"
              />

              {errors.email && (
                <small className="field-error">{errors.email}</small>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="prevision">Previsión</label>

              <select
                id="prevision"
                name="prevision"
                value={form.prevision}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="Fonasa">Fonasa</option>
                <option value="Isapre">Isapre</option>
                <option value="Particular">Particular</option>
                <option value="Otro convenio">Otro convenio</option>
              </select>
            </div>
          </div>

          <div className="form-divider" />

          <div className="form-heading">
            <span>Paso 2</span>
            <h3>Preferencias de atención</h3>
          </div>

          <div className="form-grid">
            <div className="form-field form-field-full">
              <label htmlFor="especialidad">Especialidad *</label>

              <select
                id="especialidad"
                name="especialidad"
                value={form.especialidad}
                onChange={handleChange}
              >
                <option value="">Seleccione una especialidad</option>

                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>

              {errors.especialidad && (
                <small className="field-error">{errors.especialidad}</small>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="modalidad">Modalidad *</label>

              <select
                id="modalidad"
                name="modalidad"
                value={form.modalidad}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="Presencial">Presencial</option>
                <option value="Telemedicina">Telemedicina</option>
                <option value="Por confirmar">Por confirmar</option>
              </select>

              {errors.modalidad && (
                <small className="field-error">{errors.modalidad}</small>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="fechaPreferida">Fecha preferida</label>

              <input
                id="fechaPreferida"
                name="fechaPreferida"
                type="date"
                value={form.fechaPreferida}
                onChange={handleChange}
              />
            </div>

            <div className="form-field form-field-full">
              <span className="field-label">Horario preferido</span>

              <div className="schedule-options">
                {["Mañana", "Tarde", "Indistinto"].map((option) => (
                  <label className="schedule-option" key={option}>
                    <input
                      type="radio"
                      name="horario"
                      value={option}
                      checked={form.horario === option}
                      onChange={handleChange}
                    />

                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-field form-field-full">
              <label htmlFor="mensaje">Información adicional</label>

              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows="5"
                placeholder="Indique brevemente el motivo de la consulta o alguna necesidad especial."
              />
            </div>
          </div>

          <label className="privacy-check">
            <input
              type="checkbox"
              name="aceptaPrivacidad"
              checked={form.aceptaPrivacidad}
              onChange={handleChange}
            />

            <span>
              Autorizo el uso de estos datos exclusivamente para gestionar esta
              solicitud de atención.
            </span>
          </label>

          {errors.aceptaPrivacidad && (
            <small className="field-error privacy-error">
              {errors.aceptaPrivacidad}
            </small>
          )}

          <button
            className="button button-primary submit-button"
            type="submit"
            disabled={status.type === "loading"}
          >
            {status.type === "loading"
              ? "Registrando solicitud..."
              : "Enviar solicitud"}
          </button>

          {status.type !== "idle" && (
            <div
              className={`form-status form-status-${status.type}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default AppointmentForm;