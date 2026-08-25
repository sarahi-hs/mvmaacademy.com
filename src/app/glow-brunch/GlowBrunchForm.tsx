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
      alert("Déjame tu nombre y correo para poder avisarte.");
      return;
    }
    const msg =
      "¡Hola Sarahi! ✨ Quiero estar en la lista de espera para el próximo Glow Brunch.\n\n" +
      `Mi nombre: ${n}\n` +
      `Mi correo: ${c}\n\n` +
      "¡Avísame apenas se abran los lugares!";
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <form className="gb-reservar" id="reservar" onSubmit={handleSubmit} noValidate>
      <h3>
        Anótate a la <em>lista</em>
      </h3>

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
        Anótame por WhatsApp
        <span className="gb-arrow" aria-hidden="true">
          →
        </span>
      </button>
      <p className="gb-form-note">
        Sin costo, sin compromiso. Te aviso primero cuando abramos los lugares.
      </p>
    </form>
  );
}
