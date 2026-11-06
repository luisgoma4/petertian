# Changelog

## 2026-10-31

- Revisión de seguridad tras el «octubre negro»: sin cambios de código.
  Pendientes de baja severidad en `docs/seguridad-2026-10-31.md`.

## 2026-09-03

- Creado el orquestador de PeterTian: constitución de 9 reglas, 6 agentes
  (`repo-scout`, `ui-designer`, `frontend-builder`, `copy-translator`,
  `qa-verifier`, `docs-librarian`), 6 comandos `/pt:*` y 2 hooks, reciclados y
  recortados desde PeterVintage.
- Añadido `copy-translator`, agente nuevo que no existía en PeterVintage: mantiene
  los pares PL/EN sincronizados y valida que ningún nodo quede huérfano.
- Publicadas las dos webs de una pantalla: `/mandarin` (identidad del flyer del
  cliente) y `/music` (identidad nocturna a partir de la foto de directo).
- Puerta en la raíz con dos accesos. Las webs no se enlazan entre sí.
- Copy en polaco e inglés tomada literalmente de los dos flyers del cliente, que
  ya venían traducidos.

### Despliegue

- Repo público en github.com/luisgoma4/petertian.
- Cloudflare Pages conectado a `main`: build output `site`, sin comando de build.
  Se retira el `CNAME` de GitHub Pages, que ya no aplica.
- Dominio `petertian.com` y `www` añadidos como custom domains. Certificado
  cubriendo ambos, válido hasta 2026-12-02.
- Verificado en producción: 200 en `/`, `/mandarin/` y `/music/` por ápex y por
  www; CSS, JS y WebP sirviendo; 0 enlaces cruzados entre las dos webs.

Pendiente en el panel, no en el repo: activar *Always Use HTTPS* (ahora el
puerto 80 responde 200 en claro) y decidir el canónico entre ápex y www.
