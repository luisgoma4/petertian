---
description: Fase 2 — Implementa un bloque o cambio en una de las webs
argument-hint: "<web> <qué construir>, p. ej. music sección de precios"
---

# Fase 2 — Construir

Trabajo: $ARGUMENTS

## Bucle

1. **Contexto** — si no sabes dónde vive la pieza, lanza `repo-scout`. Si ya lo
   sabes, no lo lances: cuesta tokens re-derivar lo que ya está en pantalla.
2. **Copy** — si el cambio añade texto visible, lanza `copy-translator` **antes**
   de maquetar, para tener PL y EN cerrados.
3. **Implementación** — lanza `frontend-builder` con el texto ya resuelto.
4. **Verificación** — lanza `qa-verifier` sobre la web tocada.
5. **Estado** — lanza `docs-librarian` para actualizar `tasks.md` y `changelog.md`.

Si `qa-verifier` reporta fallos, vuelve al punto 3 con la lista. No cierres la
tarea con fallos abiertos y no la marques `hecho` tú mismo.

## Recordatorio

Cualquier enlace nuevo entre `/mandarin` y `/music` es un fallo, no un extra.
