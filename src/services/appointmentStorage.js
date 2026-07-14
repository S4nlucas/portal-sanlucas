const STORAGE_KEY = "sanlucas_appointment_requests";

export const APPOINTMENT_STATUSES = {
  PENDING: "Pendiente",
  CONTACTED: "Contactado",
  SCHEDULED: "Agendado",
  CANCELLED: "Cancelado",
};

function readAppointments() {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      return [];
    }

    const parsedData = JSON.parse(storedData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("No fue posible leer las solicitudes:", error);
    return [];
  }
}

function writeAppointments(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

export function getAppointments() {
  return readAppointments().sort(
    (first, second) =>
      new Date(second.createdAt).getTime() -
      new Date(first.createdAt).getTime(),
  );
}

export function createAppointmentRequest(formData) {
  const appointments = readAppointments();

  const newAppointment = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `solicitud-${Date.now()}`,
    ...formData,
    status: APPOINTMENT_STATUSES.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  writeAppointments([newAppointment, ...appointments]);

  return newAppointment;
}

export function updateAppointmentStatus(appointmentId, newStatus) {
  const appointments = readAppointments();

  const updatedAppointments = appointments.map((appointment) =>
    appointment.id === appointmentId
      ? {
          ...appointment,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        }
      : appointment,
  );

  writeAppointments(updatedAppointments);

  return updatedAppointments;
}

export function deleteAppointmentRequest(appointmentId) {
  const appointments = readAppointments();

  const updatedAppointments = appointments.filter(
    (appointment) => appointment.id !== appointmentId,
  );

  writeAppointments(updatedAppointments);

  return updatedAppointments;
}