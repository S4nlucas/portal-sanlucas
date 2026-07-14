import { useEffect, useMemo, useState } from "react";
import {
  APPOINTMENT_STATUSES,
  deleteAppointmentRequest,
  getAppointments,
  updateAppointmentStatus,
} from "../services/appointmentStorage";

const statusOptions = Object.values(APPOINTMENT_STATUSES);

function formatDate(dateValue) {
  if (!dateValue) {
    return "Sin preferencia";
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${dateValue}T12:00:00`));
}

function formatDateTime(dateValue) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const filteredAppointments = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesStatus =
        selectedStatus === "Todos" ||
        appointment.status === selectedStatus;

      const searchableContent = [
        appointment.nombre,
        appointment.rut,
        appointment.telefono,
        appointment.email,
        appointment.especialidad,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || searchableContent.includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [appointments, searchTerm, selectedStatus]);

  const stats = useMemo(
    () => ({
      total: appointments.length,
      pendientes: appointments.filter(
        (item) => item.status === APPOINTMENT_STATUSES.PENDING,
      ).length,
      contactados: appointments.filter(
        (item) => item.status === APPOINTMENT_STATUSES.CONTACTED,
      ).length,
      agendados: appointments.filter(
        (item) => item.status === APPOINTMENT_STATUSES.SCHEDULED,
      ).length,
    }),
    [appointments],
  );

  const handleStatusChange = (appointmentId, newStatus) => {
    const updatedAppointments = updateAppointmentStatus(
      appointmentId,
      newStatus,
    );

    setAppointments(updatedAppointments);
  };

  const handleDelete = (appointmentId) => {
    const confirmed = window.confirm(
      "¿Desea eliminar definitivamente esta solicitud?",
    );

    if (!confirmed) {
      return;
    }

    const updatedAppointments = deleteAppointmentRequest(appointmentId);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">SL</div>

          <div>
            <strong>Clínica San Lucas</strong>
            <span>Panel de recepción</span>
          </div>
        </div>

        <nav className="admin-navigation">
          <a className="active" href="/admin">
            Solicitudes
          </a>

          <a href="/">Ver sitio web</a>
        </nav>

        <div className="admin-sidebar-footer">
          <span>Prototipo local</span>
          <small>Los datos están guardados en este navegador.</small>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <span className="admin-overline">Recepción</span>
            <h1>Solicitudes de atención</h1>
            <p>
              Revise, contacte y actualice el estado de cada solicitud.
            </p>
          </div>

          <a className="button button-primary" href="/">
            Ir al sitio
          </a>
        </header>

        <section className="admin-stats">
          <article>
            <span>Total</span>
            <strong>{stats.total}</strong>
          </article>

          <article>
            <span>Pendientes</span>
            <strong>{stats.pendientes}</strong>
          </article>

          <article>
            <span>Contactados</span>
            <strong>{stats.contactados}</strong>
          </article>

          <article>
            <span>Agendados</span>
            <strong>{stats.agendados}</strong>
          </article>
        </section>

        <section className="admin-content">
          <div className="admin-toolbar">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar por paciente, RUT o especialidad"
            />

            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              <option value="Todos">Todos los estados</option>

              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="admin-empty">
              <strong>No hay solicitudes para mostrar.</strong>
              <span>
                Complete el formulario del sitio para generar una solicitud de
                prueba.
              </span>
            </div>
          ) : (
            <div className="appointment-admin-list">
              {filteredAppointments.map((appointment) => (
                <article
                  className="appointment-admin-card"
                  key={appointment.id}
                >
                  <div className="appointment-admin-header">
                    <div>
                      <span className="appointment-date">
                        Recibida el {formatDateTime(appointment.createdAt)}
                      </span>

                      <h2>{appointment.nombre}</h2>

                      <span className="appointment-specialty">
                        {appointment.especialidad}
                      </span>
                    </div>

                    <span
                      className={`status-badge status-${appointment.status
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <div className="appointment-admin-details">
                    <div>
                      <span>RUT</span>
                      <strong>{appointment.rut || "No informado"}</strong>
                    </div>

                    <div>
                      <span>Teléfono</span>
                      <strong>{appointment.telefono}</strong>
                    </div>

                    <div>
                      <span>Correo</span>
                      <strong>{appointment.email || "No informado"}</strong>
                    </div>

                    <div>
                      <span>Previsión</span>
                      <strong>
                        {appointment.prevision || "No informada"}
                      </strong>
                    </div>

                    <div>
                      <span>Modalidad</span>
                      <strong>{appointment.modalidad}</strong>
                    </div>

                    <div>
                      <span>Fecha preferida</span>
                      <strong>{formatDate(appointment.fechaPreferida)}</strong>
                    </div>

                    <div>
                      <span>Horario</span>
                      <strong>
                        {appointment.horario || "Sin preferencia"}
                      </strong>
                    </div>
                  </div>

                  {appointment.mensaje && (
                    <div className="appointment-message">
                      <span>Información adicional</span>
                      <p>{appointment.mensaje}</p>
                    </div>
                  )}

                  <div className="appointment-admin-actions">
                    <label>
                      <span>Estado</span>

                      <select
                        value={appointment.status}
                        onChange={(event) =>
                          handleStatusChange(
                            appointment.id,
                            event.target.value,
                          )
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div>
                      <a href={`tel:${appointment.telefono}`}>Llamar</a>

                      {appointment.email && (
                        <a href={`mailto:${appointment.email}`}>
                          Enviar correo
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;