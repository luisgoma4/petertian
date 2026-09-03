---
description: Fase 3 — Audita las dos webs antes de publicar
argument-hint: "[mandarin | music | ambas]"
---

# Fase 3 — Verificar

Alcance: $ARGUMENTS (si está vacío, ambas)

1. Lanza `qa-verifier` sobre cada web del alcance.
2. Lanza `copy-translator` en modo revisión: diacríticos polacos, tono, y el
   conteo de pares `data-pl` / `data-en`.
3. Levanta un servidor local para que el usuario mire con sus propios ojos:

   ```
   python3 -m http.server 8080 --directory site
   ```

   Y dile exactamente qué abrir:
   `http://localhost:8080/` · `/mandarin/` · `/music/`

4. Pídele al usuario que confirme los cuatro puntos que tú no puedes ver:
   render a 375 px, cambio PL/EN en vivo, foco de teclado, y que el botón de
   WhatsApp abre con el mensaje correcto.

**No declares nada "listo" antes de que el usuario responda** (Regla 7).
