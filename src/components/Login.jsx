import { useState } from "react";
import { login } from "../services/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const session = await login(email, password);

      onLogin(session);

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">

      <form
        className="login-card"
        onSubmit={handleSubmit}
      >

        <h1>Clínica San Lucas</h1>

        <p>Acceso Recepción</p>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <button disabled={loading}>
          {loading
            ? "Ingresando..."
            : "Ingresar"}
        </button>

      </form>

    </div>
  );
}