---
description: Fase 1 — Define o ajusta los tokens de identidad de una web
argument-hint: "mandarin | music"
---

# Fase 1 — Identidad

Web objetivo: $ARGUMENTS

Delega en `ui-designer`. Pásale:

- La ruta de su `theme.css` actual y de `docs/02-design-system.md`.
- El recordatorio de que las dos identidades deben **seguir sin parecerse**.
- La restricción de fuentes del sistema y texturas por gradiente.

Cuando vuelva, si ha tocado tokens que afectan a componentes existentes, lanza
`qa-verifier` sobre esa web para confirmar contraste y que nada se ha roto.

**No apliques cambios de diseño desde el hilo principal** salvo que sea una
línea y ya tengas el fichero en contexto.
