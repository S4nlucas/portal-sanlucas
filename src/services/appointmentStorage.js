import { supabase } from "../lib/supabase";

export const APPOINTMENT_STATUSES = {
  PENDING: "Pendiente",
  CONTACTED: "Contactado",
  SCHEDULED: "Agendado",
  CANCELLED: "Cancelado",
};

function normalizeAppointment(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    rut: row.rut || "",
    telefono: row.telefono,
    email: row.email || "",
    especialidad: row.especialidad,
    prevision: row.prevision || "",
    modalidad: row.modalidad,
    fechaPreferida: row.fecha_preferida || "",
    horario: row.horario || "",
    mensaje: row.mensaje || "",
    status: row.estado,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createAppointmentRequest(formData) {
  const payload = {
    nombre: formData.nombre,
    rut: formData.rut || null,
    telefono: formData.telefono,
    email: formData.email || null,
    especialidad: formData.especialidad,
    prevision: formData.prevision || null,
    modalidad: formData.modalidad,
    fecha_preferida: formData.fechaPreferida || null,
    horario: formData.horario || null,
    mensaje: formData.mensaje || null,
    estado: APPOINTMENT_STATUSES.PENDING,
  };

  const { error } = await supabase
    .from("appointment_requests")
    .insert(payload);

  if (error) {
    console.error(
      "Error al registrar solicitud:",
      error,
    );

    throw new Error(
      "No fue posible registrar la solicitud.",
    );
  }

  return true;
}

export async function getAppointments() {
  const { data, error } = await supabase
    .from("appointment_requests")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    throw error;
  }

  return data.map(normalizeAppointment);
}

export async function updateAppointmentStatus(
  appointmentId,
  newStatus,
) {
  const { data, error } = await supabase
    .from("appointment_requests")
    .update({
      estado: newStatus,
    })
    .eq("id", appointmentId)
    .select()
    .single();

  if (error) {
    console.error(
      "Error al actualizar estado:",
      error,
    );

    throw new Error(
      "No fue posible actualizar el estado.",
    );
  }

  return normalizeAppointment(data);
}

export async function deleteAppointmentRequest(
  appointmentId,
) {
  const { error } = await supabase
    .from("appointment_requests")
    .delete()
    .eq("id", appointmentId);

  if (error) {
    console.error(
      "Error al eliminar solicitud:",
      error,
    );

    throw new Error(
      "No fue posible eliminar la solicitud.",
    );
  }

  return appointmentId;
}