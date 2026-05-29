/**
 * PR AUTO-PILOT — Reenviador de Gmail (Google Apps Script)
 *
 * Qué hace: cada 5 minutos revisa tu Gmail buscando correos de las plataformas
 * de periodistas (HARO/Featured, Qwoted, Connectively, SOS, JournoRequests) y
 * los manda a tu sistema para que la IA los califique.
 *
 * CÓMO INSTALAR (te guío paso a paso en el chat):
 *   1. Ve a https://script.google.com  (con tu cuenta sarahiharoequipo@gmail.com)
 *   2. "Nuevo proyecto" → borra todo y pega este código
 *   3. Cambia los 2 valores de abajo (WEBHOOK_URL y WEBHOOK_SECRET)
 *   4. Guarda, corre "procesarPeticionesPR" una vez (autoriza permisos)
 *   5. Crea un activador (trigger) cada 5 minutos para "procesarPeticionesPR"
 */

// ===== CONFIGURA ESTOS 2 VALORES =====
var WEBHOOK_URL = "https://mvmaacademy.com/api/pr-autopilot/webhook";
var WEBHOOK_SECRET = "PEGA_AQUI_TU_SECRETO"; // el mismo que pondremos en Vercel
// =====================================

// Remitentes de las plataformas de periodistas
var SENDERS = [
  "featured.com",
  "helpareporter.com",
  "qwoted.com",
  "connectively.us",
  "sourceofsources.com",
  "journorequests.com",
];

var PROCESSED_LABEL = "PR-Autopilot-Procesado";

function procesarPeticionesPR() {
  var label = GmailApp.getUserLabelByName(PROCESSED_LABEL);
  if (!label) label = GmailApp.createLabel(PROCESSED_LABEL);

  // Buscar correos recientes de esas plataformas que NO estén ya procesados
  var fromQuery = SENDERS.map(function (s) { return "from:" + s; }).join(" OR ");
  var query = "(" + fromQuery + ") newer_than:2d -label:" + PROCESSED_LABEL;

  var threads = GmailApp.search(query, 0, 25);
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var msg = messages[j];
      try {
        enviarAlWebhook(msg);
      } catch (e) {
        Logger.log("Error: " + e);
      }
    }
    threads[i].addLabel(label);
  }
}

function enviarAlWebhook(msg) {
  var from = msg.getFrom();
  var source = "PR";
  for (var k = 0; k < SENDERS.length; k++) {
    if (from.indexOf(SENDERS[k]) !== -1) {
      source = SENDERS[k];
      break;
    }
  }

  var payload = {
    source: source,
    subject: msg.getSubject(),
    journalist_email: extraerEmail(from),
    body: msg.getPlainBody().slice(0, 6000),
    deadline: "",
  };

  UrlFetchApp.fetch(WEBHOOK_URL, {
    method: "post",
    contentType: "application/json",
    headers: { "x-webhook-secret": WEBHOOK_SECRET },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
}

function extraerEmail(from) {
  var m = from.match(/<([^>]+)>/);
  return m ? m[1] : from;
}
