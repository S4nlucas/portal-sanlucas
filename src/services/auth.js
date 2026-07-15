import { supabase } from "../lib/supabase";

export async function login(email, password) {
  const normalizedEmail = String(email ?? "")
    .trim()
    .toLowerCase();

  if (!normalizedEmail || !password) {
    throw new Error(
      "Ingrese el correo y la contraseña.",
    );
  }

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

  if (error) {
    console.error(
      "Error al iniciar sesión:",
      error,
    );

    throw new Error(
      "Correo o contraseña incorrectos.",
    );
  }

  if (!data.session) {
    throw new Error(
      "No fue posible iniciar la sesión.",
    );
  }

  return data.session;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(
      "Error al cerrar sesión:",
      error,
    );

    throw new Error(
      "No fue posible cerrar la sesión.",
    );
  }
}

export async function getCurrentSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error(
      "Error al recuperar la sesión:",
      error,
    );

    return null;
  }

  return session;
}

export function subscribeToAuthChanges(callback) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      callback(session);
    },
  );

  return () => {
    subscription.unsubscribe();
  };
}