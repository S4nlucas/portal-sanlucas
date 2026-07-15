import AppointmentForm from "./components/AppointmentForm";
import AdminAccess from "./components/AdminAccess";
import "./styles/global.css";

function App() {
  const currentPath =
    window.location.pathname.replace(/\/+$/, "") || "/";

  if (currentPath === "/admin") {
    return <AdminAccess />;
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <span>Clínica de Nefrología San Lucas</span>

          <div className="topbar-links">
            <a href="tel:+56222895253">+56 2 2289 5253</a>

            <a href="mailto:contacto@sanlucas.cl">
              contacto@sanlucas.cl
            </a>
          </div>
        </div>
      </header>

      <nav className="navbar">
        <div className="container navbar-inner">
          <a className="brand" href="#inicio">
            <div className="brand-mark">SL</div>

            <div>
              <strong>Clínica San Lucas</strong>
              <span>Nefrología y cuidado renal</span>
            </div>
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
        <section className="hero" id="inicio">
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
                  <strong>Orientación al paciente</strong>
                  <span>Información clara y acceso directo</span>
                </div>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-card-image">
                <div className="image-placeholder">
                  Fotografía principal de la clínica
                </div>
              </div>

              <div className="appointment-card">
                <span>Solicitud de atención</span>

                <h2>Solicite una hora médica</h2>

                <p>
                  Complete sus datos y nuestro equipo se pondrá en contacto
                  para confirmar disponibilidad.
                </p>

                <a
                  className="button button-primary button-full"
                  href="#agenda"
                >
                  Solicitar atención
                </a>
              </div>
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

        <section className="section" id="especialidades">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Especialidades</span>

              <h2>
                Atención centrada en cada etapa del cuidado renal
              </h2>

              <p>
                Servicios especializados para prevención, diagnóstico,
                tratamiento y seguimiento de enfermedades renales.
              </p>
            </div>

            <div className="cards-grid">
              <article className="service-card">
                <div className="service-icon">01</div>

                <h3>Nefrología</h3>

                <p>
                  Evaluación, diagnóstico y control de enfermedades renales.
                </p>

                <a href="#agenda">Solicitar atención</a>
              </article>

              <article className="service-card">
                <div className="service-icon">02</div>

                <h3>Hemodiálisis</h3>

                <p>
                  Tratamientos supervisados y acompañamiento clínico continuo.
                </p>

                <a href="#agenda">Solicitar atención</a>
              </article>

              <article className="service-card">
                <div className="service-icon">03</div>

                <h3>Diálisis peritoneal</h3>

                <p>
                  Orientación, capacitación y seguimiento especializado.
                </p>

                <a href="#agenda">Solicitar atención</a>
              </article>

              <article className="service-card">
                <div className="service-icon">04</div>

                <h3>Educación al paciente</h3>

                <p>
                  Información clara para pacientes, cuidadores y familias.
                </p>

                <a href="#pacientes">Ver recursos</a>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="pacientes">
          <div className="container split-layout">
            <div>
              <span className="eyebrow">Información útil</span>

              <h2>
                Todo lo que el paciente necesita en un solo lugar
              </h2>

              <p>
                La nueva plataforma permitirá centralizar indicaciones,
                requisitos, preguntas frecuentes y canales de contacto.
              </p>
            </div>

            <div className="info-list">
              <article>
                <strong>Preparación para la atención</strong>
                <span>
                  Documentos, exámenes y recomendaciones previas.
                </span>
              </article>

              <article>
                <strong>Convenios y cobertura</strong>
                <span>
                  Información sobre previsión y formas de atención.
                </span>
              </article>

              <article>
                <strong>Preguntas frecuentes</strong>
                <span>
                  Respuestas directas a las consultas más habituales.
                </span>
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
      <span className="eyebrow eyebrow-light">
        Contacto
      </span>

      <h2>Conversemos sobre su atención</h2>

      <p>
        Nuestro equipo puede orientarle sobre
        especialidades, disponibilidad y requisitos
        para su atención.
      </p>

      <div className="contact-information">

        <div>
          <strong>Dirección</strong>

          <span>
            Avenida Diego Portales N.º 197,
            La Florida,
            Región Metropolitana
          </span>
        </div>

        <div>
          <strong>Teléfono</strong>

          <a href="tel:+56222895253">
            +56 2 2289 5253
          </a>
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
        Nuestro equipo responderá sus consultas y
        le ayudará a coordinar una atención.
      </p>

      <a
        className="button button-outline-light"
        href="tel:+56222895253"
      >
        Llamar a la clínica
      </a>

      <a
        className="button button-primary"
        href="#agenda"
      >
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