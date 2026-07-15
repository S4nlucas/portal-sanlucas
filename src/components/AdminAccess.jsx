import {
  useEffect,
  useState,
} from "react";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import {
  getCurrentSession,
  logout,
  subscribeToAuthChanges,
} from "../services/auth";

function AdminAccess() {
  const [session, setSession] =
    useState(null);
  const [loading, setLoading] =
    useState(true);
  const [logoutError, setLogoutError] =
    useState("");
  const [loggingOut, setLoggingOut] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeSession = async () => {
      const currentSession =
        await getCurrentSession();

      if (mounted) {
        setSession(currentSession);
        setLoading(false);
      }
    };

    initializeSession();

    const unsubscribe =
      subscribeToAuthChanges(
        (updatedSession) => {
          if (mounted) {
            setSession(updatedSession);
            setLoading(false);
          }
        },
      );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const handleLogin = (
    authenticatedSession,
  ) => {
    setLogoutError("");
    setSession(authenticatedSession);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    setLogoutError("");

    try {
      await logout();
      setSession(null);
    } catch (error) {
      setLogoutError(
        error.message ||
          "No fue posible cerrar la sesión.",
      );
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <main className="auth-loading-page">
        <div className="auth-loading-card">
          <div className="auth-loading-mark">
            SL
          </div>

          <strong>
            Verificando acceso
          </strong>

          <span>
            Espere un momento...
          </span>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <Login onLogin={handleLogin} />
    );
  }

  return (
    <div className="authenticated-admin">
      <div className="admin-session-bar">
        <div>
          <span>
            Sesión iniciada como
          </span>

          <strong>
            {session.user.email}
          </strong>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut
            ? "Cerrando..."
            : "Cerrar sesión"}
        </button>
      </div>

      {logoutError && (
        <div className="admin-session-error">
          {logoutError}
        </div>
      )}

      <AdminDashboard />
    </div>
  );
}

export default AdminAccess;