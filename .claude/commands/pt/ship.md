---
description: Fase 4 — Publica en Cloudflare Pages
argument-hint: "[nota para el commit]"
---

# Fase 4 — Publicar

Nota: $ARGUMENTS

## Cómo está montado

GitHub `luisgoma4/petertian` es el origen; **Cloudflare Pages despliega solo en
cada push a `main`**. No hay `CNAME` ni GitHub Pages: publicar = hacer push.

| Ajuste del proyecto en Cloudflare | Valor |
|---|---|
| Framework preset | None |
| Build command | *(vacío)* |
| Build output directory | `site` |
| Production branch | `main` |

## Precondiciones (compruébalas, no las supongas)

- `/pt:verify` ha pasado y el usuario ha confirmado la revisión visual.
- `docs/pendiente-cliente.md` está al día: el usuario debe saber qué se publica
  incompleto y por qué.

## Pasos

1. `git status` y `git add site docs` — revisa qué entra.
2. Commit en imperativo y en español, con ámbito.
3. **Confirma con el usuario antes de `git push`.** Un push publica de cara al
   público en un par de minutos; no lo hagas por iniciativa propia.
4. Comprueba el despliegue:
   `curl -s -o /dev/null -w '%{http_code}\n' https://petertian.com/ /mandarin/ /music/`
   Si devuelve 404, el `Build output directory` no es `site`.

## Después

`docs-librarian` cierra las tareas publicadas y añade la entrada al changelog.
