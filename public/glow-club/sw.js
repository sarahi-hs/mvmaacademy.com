// Service Worker del Glow Club — corre en segundo plano en el cel de la
// chica. Se encarga de:
//   1) Recibir mensajes 'push' del servidor y mostrarlos como notificación
//   2) Cuando la chica toca la notificación, abrir el portal (o traerlo
//      al frente si ya está abierto)
//
// Scope: '/glow-club/' — solo maneja pushes de esta parte del sitio.

self.addEventListener("install", (event) => {
  // Activar el nuevo SW en cuanto se instale, sin esperar a la próxima carga
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Tomar control de todas las páginas abiertas del scope
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = {
    title: "Glow Club",
    body: "Aún no diste tu check de hoy 🌸",
    url: "/glow-club",
  };
  try {
    if (event.data) {
      payload = { ...payload, ...event.data.json() };
    }
  } catch (e) {
    // Si el server manda algo raro, usamos el default
  }

  const options = {
    body: payload.body,
    icon: "/glow-club/icons/icon-192.png",
    badge: "/glow-club/icons/favicon-32.png",
    tag: "glow-daily-reminder",   // solo una notificación de este tipo a la vez
    renotify: false,
    data: { url: payload.url || "/glow-club" },
    // Ajustes suaves para que no se sienta agresivo
    silent: false,
  };

  event.waitUntil(self.registration.showNotification(payload.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || "/glow-club";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // Si ya hay una pestaña del portal abierta, la enfocamos
        for (const client of clientList) {
          if (client.url.includes("/glow-club") && "focus" in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }
        // Si no, abrimos una nueva
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      })
  );
});
