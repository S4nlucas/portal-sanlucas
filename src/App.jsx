import AppointmentForm from "./components/AppointmentForm";
import AdminAccess from "./components/AdminAccess";
import "./styles/global.css";

import heroImage from "./assets/images/Hero/hero-dialisis.JPG";
import clinicLogo from "./assets/images/brand/logo-san-lucas-acreditado.jpg";
import hemodialysisImage from "./assets/images/specialties/hemodialisis.png";
import kidneyImage from "./assets/images/specialties/rinones.png";
import integralCareImage from "./assets/images/specialties/tratamiento-integral.png";

import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  CalendarCheck,
  CircleHelp,
  CreditCard,
  Droplets,
  FileText,
  HeartPulse,
  Phone,
  Salad,
} from "lucide-react";

function App() {
  const currentPath =
    window.location.pathname.replace(/\/+$/, "") || "/";

  if (currentPath === "/admin") {
    return <AdminAccess />;
  }

  return (
    <div className="site-shell">
      <nav className="navbar">
        <div className="container navbar-inner">
          <a className="brand brand-logo-link" href="#inicio">
            <img
              className="brand-logo-image"
              src={clinicLogo}
              alt="Nefrodiálisis San Lucas, centro acreditado"
            />
          </a>

          <div className="nav-links">
            <a href="#inicio">Inicio</a>
            <a href="#especialidades">Especialidades</a>
            <a href="#equipo">Equipo médico</a>
            <a href="#pacientes">Pacientes</a>
            <a href="#contacto">Contacto</a>
          </div>

          <a className="button button-primary" href="#agenda">
            Solicitar hora
          </a>
        </div>
      </nav>

      <main>
        <section
          className="hero"
          id="inicio"
          style={{
            backgroundImage: `linear-gradient(
              rgba(8, 35, 66, 0.82),
              rgba(8, 35, 66, 0.72)
            ), url(${heroImage})`,
          }}
        >
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">
                Atención especializada en salud renal
              </span>

              <h1>
                Cuidamos su salud renal con experiencia y cercanía
              </h1>

              <p>
                Atención nefrológica integral, tratamientos especializados y
                acompañamiento permanente para pacientes y sus familias.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#agenda">
                  Solicitar hora
                </a>

                <a
                  className="button button-secondary"
                  href="#especialidades"
                >
                  Ver especialidades
                </a>
              </div>

              <div className="hero-features">
                <div>
                  <strong>Atención integral</strong>
                  <span>Evaluación, tratamiento y seguimiento</span>
                </div>

                <div>
                  <strong>Equipo especializado</strong>
                  <span>Profesionales con experiencia clínica</span>
                </div>

                <div>
                  <strong>Centro acreditado</strong>
                  <span>Compromiso con la calidad y seguridad</span>
                </div>
              </div>
            </div>

            <div className="hero-accreditation-card">
              <span className="hero-card-label">Centro acreditado</span>

              <h2>Atención renal con respaldo institucional</h2>

              <p>
                Clínica San Lucas entrega atención especializada en nefrología
                y diálisis, con foco en seguridad, calidad y acompañamiento.
              </p>

              <ul>
                <li>Atención nefrológica especializada</li>
                <li>Centro de diálisis</li>
                <li>Equipo multidisciplinario</li>
                <li>Solicitud de atención en línea</li>
              </ul>

              <a className="button button-light button-full" href="#agenda">
                Solicitar evaluación
              </a>
            </div>
          </div>
        </section>

        <section className="quick-access">
          <div className="container quick-access-grid">
            <article>
              <span>01</span>

              <div>
                <h3>Solicitar atención</h3>
                <p>Solicite una hora de forma rápida y sencilla.</p>
              </div>
            </article>

            <article>
              <span>02</span>

              <div>
                <h3>Conocer especialidades</h3>
                <p>Revise nuestros servicios y áreas de atención.</p>
              </div>
            </article>

            <article>
              <span>03</span>

              <div>
                <h3>Información para pacientes</h3>
                <p>Indicaciones, documentos y preguntas frecuentes.</p>
              </div>
            </article>
          </div>
        </section>

        <section
          className="section specialties-section"
          id="especialidades"
        >
          <div className="container">
            <div className="section-heading specialties-heading">
              <span className="eyebrow">Especialidades</span>

              <h2>
                Atención especializada para cada etapa del cuidado renal
              </h2>

              <p>
                Evaluación, tratamiento y acompañamiento clínico para
                pacientes con enfermedad renal y sus familias.
              </p>
            </div>

            <div className="specialties-grid">
              <article className="specialty-overlay-card">
                <img
                  src={kidneyImage}
                  alt="Nefrología y cuidado renal"
                />

                <div className="specialty-overlay" />

                <div className="specialty-overlay-content">
                  <div className="specialty-overlay-icon">
                    <HeartPulse size={27} strokeWidth={1.8} />
                  </div>

                  <span>Evaluación clínica</span>

                  <h3>Nefrología</h3>

                  <p>
                    Evaluación, diagnóstico y seguimiento de enfermedades
                    renales.
                  </p>

                  <a href="#agenda">
                    Solicitar atención
                    <ArrowRight size={17} />
                  </a>
                </div>
              </article>

              <article className="specialty-overlay-card">
                <img
                  src={hemodialysisImage}
                  alt="Tratamiento de hemodiálisis"
                />

                <div className="specialty-overlay specialty-overlay-featured" />

                <div className="specialty-overlay-content">
                  <div className="specialty-overlay-icon">
                    <Activity size={27} strokeWidth={1.8} />
                  </div>

                  <span>Tratamiento supervisado</span>

                  <h3>Hemodiálisis</h3>

                  <p>
                    Tratamiento especializado con monitoreo y control clínico
                    permanente.
                  </p>

                  <a href="#agenda">
                    Solicitar atención
                    <ArrowRight size={17} />
                  </a>
                </div>
              </article>

              <article className="specialty-overlay-card specialty-peritoneal-card">
                <div className="specialty-overlay specialty-overlay-featured" />

                <div className="specialty-overlay-content">
                  <div className="specialty-overlay-icon">
                    <Droplets size={27} strokeWidth={1.8} />
                  </div>

                  <span>Terapia domiciliaria</span>

                  <h3>Diálisis peritoneal</h3>

                  <p>
                    Capacitación y seguimiento para realizar el tratamiento de
                    forma segura.
                  </p>

                  <a href="#agenda">
                    Solicitar atención
                    <ArrowRight size={17} />
                  </a>
                </div>
              </article>

              <article className="specialty-overlay-card">
                <img
                  src={integralCareImage}
                  alt="Educación y cuidado integral del paciente renal"
                />

                <div className="specialty-overlay" />

                <div className="specialty-overlay-content">
                  <div className="specialty-overlay-icon">
                    <BookOpenCheck size={27} strokeWidth={1.8} />
                  </div>

                  <span>Orientación integral</span>

                  <h3>Educación al paciente</h3>

                  <p>
                    Información práctica para pacientes, cuidadores y
                    familias.
                  </p>

                  <a href="#pacientes">
                    Ver información
                    <ArrowRight size={17} />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section patients-section" id="pacientes">
          <div className="container">
            <div className="patients-header">
              <div className="patients-heading">
                <span className="eyebrow">Información útil</span>

                <h2>
                  Todo lo que el paciente necesita antes de su atención
                </h2>

                <p>
                  Consulte documentos, indicaciones, cobertura y canales de
                  contacto antes de asistir a Clínica San Lucas.
                </p>
              </div>

              <a className="patients-contact-link" href="#contacto">
                ¿Necesita ayuda?
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="patients-grid">
              <article className="patient-resource-card">
                <div className="patient-resource-icon">
                  <FileText size={27} strokeWidth={1.8} />
                </div>

                <div>
                  <span className="patient-resource-kicker">
                    Antes de asistir
                  </span>

                  <h3>Preparación para la atención</h3>

                  <p>
                    Revise documentos, exámenes e indicaciones necesarias para
                    su consulta.
                  </p>
                </div>

                <a href="#agenda">
                  Solicitar atención
                  <ArrowRight size={16} />
                </a>
              </article>

              <article className="patient-resource-card">
                <div className="patient-resource-icon">
                  <CreditCard size={27} strokeWidth={1.8} />
                </div>

                <div>
                  <span className="patient-resource-kicker">Previsión</span>

                  <h3>Convenios y cobertura</h3>

                  <p>
                    Información sobre Fonasa, Isapres y modalidades disponibles
                    de atención.
                  </p>
                </div>

                <a href="#contacto">
                  Consultar cobertura
                  <ArrowRight size={16} />
                </a>
              </article>

              <article className="patient-resource-card">
                <div className="patient-resource-icon">
                  <CircleHelp size={27} strokeWidth={1.8} />
                </div>

                <div>
                  <span className="patient-resource-kicker">
                    Orientación
                  </span>

                  <h3>Preguntas frecuentes</h3>

                  <p>
                    Respuestas a las consultas más habituales de pacientes y
                    familiares.
                  </p>
                </div>

                <a href="#contacto">
                  Resolver una consulta
                  <ArrowRight size={16} />
                </a>
              </article>

              <article className="patient-resource-card">
                <div className="patient-resource-icon">
                  <Salad size={27} strokeWidth={1.8} />
                </div>

                <div>
                  <span className="patient-resource-kicker">
                    Cuidado diario
                  </span>

                  <h3>Alimentación renal</h3>

                  <p>
                    Recomendaciones generales para apoyar el cuidado y
                    tratamiento renal.
                  </p>
                </div>

                <a href="#especialidades">
                  Conocer el enfoque integral
                  <ArrowRight size={16} />
                </a>
              </article>

              <article className="patient-resource-card">
                <div className="patient-resource-icon">
                  <CalendarCheck size={27} strokeWidth={1.8} />
                </div>

                <div>
                  <span className="patient-resource-kicker">
                    Coordinación
                  </span>

                  <h3>Solicitud de hora</h3>

                  <p>
                    Envíe sus datos y nuestro equipo se comunicará para
                    confirmar disponibilidad.
                  </p>
                </div>

                <a href="#agenda">
                  Solicitar una hora
                  <ArrowRight size={16} />
                </a>
              </article>

              <article className="patient-resource-card patient-resource-featured">
                <div className="patient-resource-icon">
                  <Phone size={27} strokeWidth={1.8} />
                </div>

                <div>
                  <span className="patient-resource-kicker">
                    Atención directa
                  </span>

                  <h3>¿Necesita orientación?</h3>

                  <p>
                    Comuníquese con la clínica para resolver dudas sobre
                    requisitos, horarios o atención.
                  </p>
                </div>

                <a href="tel:+56222895253">
                  Llamar al +56 2 2289 5253
                  <ArrowRight size={16} />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="equipo">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Equipo médico</span>

              <h2>Profesionales dedicados al cuidado renal</h2>

              <p>
                Esta sección se completará con fotografías, especialidades,
                experiencia y horarios de atención.
              </p>
            </div>

            <div className="doctor-grid">
              <article className="doctor-card">
                <div className="doctor-photo">Fotografía</div>

                <div>
                  <h3>Nombre del profesional</h3>
                  <span>Nefrología</span>
                </div>
              </article>

              <article className="doctor-card">
                <div className="doctor-photo">Fotografía</div>

                <div>
                  <h3>Nombre del profesional</h3>
                  <span>Medicina interna</span>
                </div>
              </article>

              <article className="doctor-card">
                <div className="doctor-photo">Fotografía</div>

                <div>
                  <h3>Nombre del profesional</h3>
                  <span>Nutrición renal</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <AppointmentForm />

        <section className="contact-section" id="contacto">
          <div className="container contact-grid">
            <div>
              <span className="eyebrow eyebrow-light">Contacto</span>

              <h2>Conversemos sobre su atención</h2>

              <p>
                Nuestro equipo puede orientarle sobre especialidades,
                disponibilidad y requisitos para su atención.
              </p>

              <div className="contact-information">
                <div>
                  <strong>Dirección</strong>

                  <span>
                    Avenida Diego Portales N.º 197, La Florida, Región
                    Metropolitana
                  </span>
                </div>

                <div>
                  <strong>Teléfono</strong>

                  <a href="tel:+56222895253">+56 2 2289 5253</a>
                </div>

                <div>
                  <strong>Correo</strong>

                  <a href="mailto:contacto@sanlucas.cl">
                    contacto@sanlucas.cl
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <h3>¿Necesita orientación?</h3>

              <p>
                Nuestro equipo responderá sus consultas y le ayudará a
                coordinar una atención.
              </p>

              <a
                className="button button-outline-light"
                href="tel:+56222895253"
              >
                Llamar a la clínica
              </a>

              <a className="button button-primary" href="#agenda">
                Solicitar una hora
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>Clínica San Lucas</strong>
            <span>Nefrología y cuidado renal</span>
          </div>

          <div className="footer-actions">
            <a href="/admin" className="staff-access-link">
              Acceso funcionarios
            </a>

            <span>© 2026 Clínica San Lucas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;