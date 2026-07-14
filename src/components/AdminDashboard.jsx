import { useEffect, useMemo, useState } from "react";
import {
  APPOINTMENT_STATUSES,
  deleteAppointmentRequest,
  getAppointments,
  updateAppointmentStatus,
} from "../services/appointmentStorage";

const statusOptions = Object.values(APPOINTMENT_STATUSES);

function formatDate(dateValue) {
  if (!dateValue) return "Sin preferencia";

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

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  async function loadAppointments() {
    try {
      setLoading(true);

      const data = await getAppointments();

      setAppointments(data);
    } catch (error) {
      console.error(error);
      alert("No fue posible cargar las solicitudes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppointments();
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
        !normalizedSearch ||
        searchableContent.includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [appointments, searchTerm, selectedStatus]);

  const stats = useMemo(
    () => ({
      total: appointments.length,
      pendientes: appointments.filter(
        (item) =>
          item.status === APPOINTMENT_STATUSES.PENDING
      ).length,
      contactados: appointments.filter(
        (item) =>
          item.status === APPOINTMENT_STATUSES.CONTACTED
      ).length,
      agendados: appointments.filter(
        (item) =>
          item.status === APPOINTMENT_STATUSES.SCHEDULED
      ).length,
    }),
    [appointments]
  );

  async function handleStatusChange(id, status) {
    try {
      await updateAppointmentStatus(id, status);

      await loadAppointments();
    } catch (error) {
      console.error(error);
      alert("No fue posible actualizar el estado.");
    }
  }

  async function handleDelete(id) {
    if (
      !window.confirm(
        "¿Desea eliminar definitivamente esta solicitud?"
      )
    ) {
      return;
    }

    try {
      await deleteAppointmentRequest(id);

      await loadAppointments();
    } catch (error) {
      console.error(error);
      alert("No fue posible eliminar la solicitud.");
    }
  }

  if (loading) {
    return (
      <div className="admin-loading">
        Cargando solicitudes...
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">SL</div>

          <div>
            <strong>Clínica San Lucas</strong>
            <span>Panel Recepción</span>
          </div>
        </div>

        <nav className="admin-navigation">
          <a className="active" href="/admin">
            Solicitudes
          </a>

          <a href="/">Ver sitio web</a>
        </nav>

        <div className="admin-sidebar-footer">
          <span>Conectado a Supabase</span>
        </div>
      </aside>

      <main className="admin-main">

        <header className="admin-header">

          <div>
            <span className="admin-overline">
              Recepción
            </span>

            <h1>Solicitudes de atención</h1>

            <p>
              Revise, contacte y actualice el
              estado de cada solicitud.
            </p>

          </div>

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
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
            >

              <option value="Todos">
                Todos
              </option>

              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}

            </select>

          </div>

          {filteredAppointments.length === 0 ? (

            <div className="admin-empty">
              No existen solicitudes.
            </div>

          ) : (

            <div className="appointment-admin-list">

              {filteredAppointments.map(
                (appointment) => (

                  <article
                    key={appointment.id}
                    className="appointment-admin-card"
                  >

                    <div className="appointment-admin-header">

                      <div>

                        <span className="appointment-date">
                          {formatDateTime(
                            appointment.createdAt
                          )}
                        </span>

                        <h2>
                          {appointment.nombre}
                        </h2>

                        <span className="appointment-specialty">
                          {
                            appointment.especialidad
                          }
                        </span>

                      </div>

                    </div>

                    <div className="appointment-admin-details">

                      <div>
                        <span>RUT</span>
                        <strong>
                          {appointment.rut ||
                            "No informado"}
                        </strong>
                      </div>

                      <div>
                        <span>Teléfono</span>
                        <strong>
                          {
                            appointment.telefono
                          }
                        </strong>
                      </div>

                      <div>
                        <span>Correo</span>
                        <strong>
                          {appointment.email ||
                            "No informado"}
                        </strong>
                      </div>

                      <div>
                        <span>Fecha</span>
                        <strong>
                          {formatDate(
                            appointment.fechaPreferida
                          )}
                        </strong>
                      </div>

                    </div>

                    {appointment.mensaje && (
                      <div className="appointment-message">
                        <p>
                          {appointment.mensaje}
                        </p>
                      </div>
                    )}

                    <div className="appointment-admin-actions">

                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(
                            appointment.id,
                            e.target.value
                          )
                        }
                      >

                        {statusOptions.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          )
                        )}

                      </select>

                      <button
                        onClick={() =>
                          handleDelete(
                            appointment.id
                          )
                        }
                      >
                        Eliminar
                      </button>

                    </div>

                  </article>
                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}