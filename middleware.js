export default function middleware(request) {
  const url = new URL(request.url);

  const fechaApertura = new Date("2026-03-24T00:00:00-03:00");
  const ahora = new Date();

  const abierto = ahora >= fechaApertura;

  if (!abierto) {
    if (url.pathname === "/" || url.pathname === "/regalo.html") {
      return Response.redirect(new URL("/bloqueado.html", request.url));
    }
  }

  if (abierto) {
    if (url.pathname === "/" || url.pathname === "/bloqueado.html") {
      return Response.redirect(new URL("/regalo.html", request.url));
    }
  }

  return fetch(request);
}
