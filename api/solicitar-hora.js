import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const clean = (value, maxLength = 500) =>
  String(value ?? "")
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, maxLength);

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Método no permitido.",
    });
  }

  try {
    const {
      nombre,
      rut,
      telefono,
      email,
      especialidad,
      previsión,
      modalidad,
      fechaPreferida,
      horario,
      mensaje,
      aceptaPrivacidad,
    } = req.body ?? {};

    if (
      !nombre?.trim() ||
      !telefono?.trim() ||
      !especialidad?.trim() ||
      !modalidad?.trim() ||
      aceptaPrivacidad !== true
    ) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos obligatorios.",
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        ok: false,
        message: "El correo electrónico no es válido.",
      });
    }

    const data = {
      nombre: clean(nombre, 120),
      rut: clean(rut, 20) || "No informado",
      telefono: clean(telefono, 30),
      email: clean(email, 150) || "No informado",
      especialidad: clean(especialidad, 100),
      prevision: clean(previsión, 100) || "No informada",
      modalidad: clean(modalidad, 50),
      fechaPreferida: clean(fechaPreferida, 30) || "Sin preferencia",
      horario: clean(horario, 30) || "Sin preferencia",
      mensaje: clean(mensaje, 1500) || "Sin información adicional",
    };

    const clinicEmail =
      process.env.CLINIC_APPOINTMENT_EMAIL || "contacto@sanlucas.cl";

    const sender =
      process.env.RESEND_FROM_EMAIL ||
      "Clínica San Lucas <solicitudes@sanlucas.cl>";

    const clinicResult = await resend.emails.send({
      from: sender,
      to: clinicEmail,
      replyTo: email || undefined,
      subject: `Nueva solicitud de hora: ${data.nombre}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#18324a">
          <div style="background:#153f70;color:#fff;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="margin:0;font-size:22px">Nueva solicitud de atención</h1>
            <p style="margin:8px 0 0;color:#d5e4ef">
              Portal web Clínica San Lucas
            </p>
          </div>

          <div style="padding:28px;border:1px solid #dce7ef;border-top:0">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:9px;font-weight:bold">Paciente</td><td style="padding:9px">${data.nombre}</td></tr>
              <tr><td style="padding:9px;font-weight:bold">RUT</td><td style="padding:9px">${data.rut}</td></tr>
              <tr><td style="padding:9px;font-weight:bold">Teléfono</td><td style="padding:9px">${data.telefono}</td></tr>
              <tr><td style="padding:9px;font-weight:bold">Correo</td><td style="padding:9px">${data.email}</td></tr>
              <tr><td style="padding:9px;font-weight:bold">Especialidad</td><td style="padding:9px">${data.especialidad}</td></tr>
              <tr><td style="padding:9px;font-weight:bold">Previsión</td><td style="padding:9px">${data.prevision}</td></tr>
              <tr><td style="padding:9px;font-weight:bold">Modalidad</td><td style="padding:9px">${data.modalidad}</td></tr>
              <tr><td style="padding:9px;font-weight:bold">Fecha preferida</td><td style="padding:9px">${data.fechaPreferida}</td></tr>
              <tr><td style="padding:9px;font-weight:bold">Horario</td><td style="padding:9px">${data.horario}</td></tr>
            </table>

            <div style="margin-top:20px;padding:18px;background:#f3f8fb;border-radius:10px">
              <strong>Información adicional</strong>
              <p style="white-space:pre-line;line-height:1.6">${data.mensaje}</p>
            </div>

            <p style="margin-top:22px;font-size:13px;color:#687c8d">
              Esta solicitud aún no representa una hora confirmada. Recepción
              debe contactar al paciente.
            </p>
          </div>
        </div>
      `,
    });

    if (clinicResult.error) {
      throw new Error(clinicResult.error.message);
    }

    if (email) {
      const patientResult = await resend.emails.send({
        from: sender,
        to: email,
        subject: "Recibimos su solicitud de atención",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#18324a">
            <div style="background:#153f70;color:#fff;padding:24px;border-radius:12px 12px 0 0">
              <h1 style="margin:0;font-size:22px">Clínica San Lucas</h1>
            </div>

            <div style="padding:28px;border:1px solid #dce7ef;border-top:0">
              <p>Estimado/a ${data.nombre}:</p>

              <p style="line-height:1.7">
                Recibimos su solicitud de atención para
                <strong>${data.especialidad}</strong>.
              </p>

              <p style="line-height:1.7">
                Nuestro equipo se comunicará al teléfono
                <strong>${data.telefono}</strong> para informar disponibilidad
                y confirmar la fecha y horario.
              </p>

              <div style="padding:16px;background:#eef6fb;border-radius:10px">
                El envío del formulario no confirma automáticamente una hora.
              </div>

              <p style="margin-top:24px">
                Atentamente,<br />
                <strong>Clínica San Lucas</strong>
              </p>
            </div>
          </div>
        `,
      });

      if (patientResult.error) {
        console.error(
          "No se pudo enviar confirmación al paciente:",
          patientResult.error,
        );
      }
    }

    return res.status(200).json({
      ok: true,
      message: "Solicitud enviada correctamente.",
    });
  } catch (error) {
    console.error("Error al procesar solicitud:", error);

    return res.status(500).json({
      ok: false,
      message:
        "No fue posible enviar la solicitud. Intente nuevamente más tarde.",
    });
  }
}