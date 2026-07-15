import { useState } from "react";
import { login } from "../services/auth";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Ingrese el correo y la contraseña.");
      return;
    }

    setLoading(true);

    try {
      const session = await login(email, password);

      if (typeof onLogin === "function") {
        onLogin(session);
      }
    } catch (loginError) {
      console.error("Error de autenticación:", loginError);

      setError(
        loginError.message ||
          "No fue posible iniciar sesión. Verifique sus credenciales.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <a className="login-back-link" href="/">
          ← Volver al sitio
        </a>

        <div className="login-brand">
          <div className="login-brand-mark">SL</div>

          <div>
            <strong>Clínica San Lucas</strong>
            <span>Portal institucional</span>
          </div>
        </div>

        <div className="login-heading">
          <span className="admin-overline">Acceso restringido</span>

          <h1>Panel de recepción</h1>

          <p>
            Ingrese con su cuenta institucional para gestionar las solicitudes
            de atención.
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="login-field">
            <label htmlFor="login-email">
              Correo electrónico
            </label>

            <input
              id="login-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@empresa.cl"
              autoComplete="email"
              disabled={loading}
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">
              Contraseña
            </label>

            <div className="password-field">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((currentValue) => !currentValue)
                }
                disabled={loading}
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <button
            className="button button-primary login-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar al panel"}
          </button>
        </form>

        <p className="login-security-note">
          Acceso exclusivo para personal de Clínica San Lucas.
        </p>
      </section>
    </main>
  );
}

export default Login;