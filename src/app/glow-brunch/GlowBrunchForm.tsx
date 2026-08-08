"use client";

import { useState } from "react";

const WA_NUMBER = "523324956118"; // +52 33 2495 6118

export function GlowBrunchForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const n = nombre.trim();
    const c = correo.trim();
    if (!n || !c) {
      alert("Déjame tu nombre y correo para poder confirmarte.");
      return;
    }
    const msg =
      "¡Hola Sarahi! Quiero apartar mi lugar para The Glow Brunch del domingo 23 de agosto en Guadalajara.\n\n" +
      `Mi nombre: ${n}\n` +
      `Mi correo: ${c}\n\n` +
      "¿Me pasas los datos para hacer la transferencia? ✨";
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <form className="gb-reservar" id="reservar" onSubmit={handleSubmit} noValidate>
      <h3>
        Aparta <em>tu lugar</em>
      </h3>
      <div className="gb-form-price">
        <span className="gb-form-price-lab">Inversión</span>
        <span className="gb-form-price-val">
          $399 <small>MXN</small>
        </span>
      </div>

      <label>
        Nombre
        <input
          type="text"
          name="nombre"
          placeholder="tu nombre"
          required
          autoComplete="name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <label>
        Correo
        <input
          type="email"
          name="correo"
          placeholder="tu@correo.com"
          required
          autoComplete="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </label>
      <button type="submit" className="gb-submit">
        Reservar por WhatsApp
        <span className="gb-arrow" aria-hidden="true">
          →
        </span>
      </button>
      <p className="gb-form-note">Sin cobro hasta confirmar por transferencia.</p>
    </form>
  );
}
