export default function middleware(request) {
  const url = new URL(request.url);

  // CAMBIA ESTA FECHA POR LA DEL CUMPLEAÑOS
  const fechaApertura = new Date("2026-04-01T00:00:00-03:00");
  const ahora = new Date();

  const abierto = ahora >= fechaApertura;

  // Si todavía no llega la fecha:
  if (!abierto) {
    // Bloquear acceso directo a regalo.html
    if (url.pathname === "/regalo.html") {
      return new Response(null, {
        status: 302,
        headers: { Location: "/bloqueado.html" }
      });
    }

    // Si entra al inicio, lo mandamos a bloqueado
    if (url.pathname === "/") {
      return new Response(null, {
        status: 302,
        headers: { Location: "/bloqueado.html" }
      });
    }
  }

  // Si ya llegó la fecha:
  if (abierto) {
    // Si entra al inicio, lo mandamos al regalo
    if (url.pathname === "/") {
      return new Response(null, {
        status: 302,
        headers: { Location: "/regalo.html" }
      });
    }

    // Si intenta entrar a bloqueado cuando ya pasó la fecha
    if (url.pathname === "/bloqueado.html") {
      return new Response(null, {
        status: 302,
        headers: { Location: "/regalo.html" }
      });
    }
  }

  // Dejar pasar las demás rutas
  return fetch(request);
}