# PeterTian — Constitución del orquestador

Dos webs de una sola pantalla para el mismo cliente, bajo `petertian.com`.
Se construyen mediante un orquestador de agentes: el hilo principal dirige, no
ejecuta trabajo pesado.

Heredado del orquestador de PeterVintage y recortado a lo que este proyecto
necesita. Lo que no está aquí, no aplica: no hay backend, ni build, ni tests
automatizados, ni framework.

## Regla 0 — El hilo principal es un director

En la conversación principal **no** se hace: exploración amplia del repo, lectura
de más de 3 ficheros, ni implementación de más de un fichero. Eso se delega.

Excepción pragmática: si el contexto necesario **ya está en la conversación**,
edita directamente en vez de relanzar un subagente que tendría que re-derivarlo.
Delegar cuesta tokens; re-derivar cuesta más.

## Regla 1 — El estado vive en ficheros

La memoria del proyecto es `docs/`, no el historial.

| Artefacto | Fichero | Lo escribe |
|---|---|---|
| Brief y alcance | `docs/01-brief.md` | `/pt:brief` |
| Sistema de diseño | `docs/02-design-system.md` | `ui-designer` |
| Plan de trabajo | `docs/03-plan.md` | `/pt:brief` |
| Estado de tareas | `docs/tasks.md` | `docs-librarian` |
| Registro de cambios | `docs/changelog.md` | `docs-librarian` |
| Pendientes del cliente | `docs/pendiente-cliente.md` | `docs-librarian` |
| Revisión de seguridad 2026-10-31 | `docs/seguridad-2026-10-31.md` | hilo principal |

Si un artefacto no existe, la fase que lo produce no se ha ejecutado. No
improvises su contenido: ejecuta la fase.

## Regla 2 — Contrato de salida de los subagentes

Todo subagente devuelve **solo** este bloque. Nunca vuelca ficheros ni diffs
completos al hilo principal.

```
RESULTADO: <una línea>
ARTEFACTOS: <rutas escritas o modificadas, una por línea>
HALLAZGOS: <máx. 5 viñetas, cada una accionable>
BLOQUEOS: <ninguno | qué falta y quién debe decidirlo>
SIGUIENTE: <la acción concreta recomendada>
```

Si necesita mostrar código, como mucho 15 líneas y una ruta.

## Regla 3 — Las dos webs son negocios separados

`site/mandarin/` y `site/music/` **nunca se enlazan entre sí ni a la raíz**. Un
visitante de una no debe descubrir la existencia de la otra. La única puerta que
las conoce a ambas es `site/index.html`.

Consecuencia práctica: nada de menú global, nada de footer con links cruzados,
nada de `og:site_name` compartido. Si un cambio introduce un enlace entre ellas,
está mal por definición, aunque quede bonito.

## Regla 4 — Esqueleto compartido, piel distinta

| Fichero | Alcance |
|---|---|
| `site/shared/base.css` | Estructura, layout, tipografía, accesibilidad. **Sin colores ni fuentes concretas.** |
| `site/shared/i18n.js` | Conmutador PL/EN. Idéntico para las dos. |
| `site/<web>/theme.css` | Tokens: colores, fuentes, sombras, radios. **Aquí va toda la identidad.** |

Un color literal (`#8C2F27`) fuera de `theme.css` es un bug. Si dos webs
necesitan la misma estructura nueva, va a `base.css`; si solo la necesita una,
se resuelve con tokens.

## Regla 5 — Bilingüe por atributos, sin claves huérfanas

Todo texto visible lleva `data-pl` y `data-en` (o `data-pl-<attr>` /
`data-en-<attr>` para atributos). **Si un nodo tiene una variante, debe tener la
otra.** `PTi18n.verificar()` lo comprueba en consola al abrir en local.

El polaco es el idioma por defecto: es el mercado. El inglés es el respaldo.

## Regla 6 — Ligereza no negociable

- Cero dependencias, cero build, cero fuentes externas, cero analytics.
- Debe funcionar abriendo el `index.html` con doble clic (`file://`).
- Presupuesto: **< 200 KB por página** con imágenes incluidas.
- Imágenes: WebP con fallback JPG, `width`/`height` siempre puestos, nunca
  servir un JPG de cámara sin redimensionar.
- Antes de añadir cualquier cosa, la pregunta es "¿esto ayuda a que alguien
  escriba a Peter por WhatsApp?". Si no, fuera.

## Regla 7 — Verificar antes de afirmar

Nunca digas "funciona" o "está arreglado" sin haberlo comprobado. Si no puedes
ejecutarlo, dilo: *"no verificado, requiere X"*.

Comprobación mínima antes de dar una web por terminada:
1. Abre en 375 px y en 1440 px — nada se desborda.
2. Cambia PL/EN — no queda ningún texto sin traducir ni ningún `undefined`.
3. Tabula con teclado — el foco se ve siempre.
4. Pulsa el botón de WhatsApp — abre con el mensaje correcto en el idioma activo.
5. `du -sh site/<web>` — por debajo del presupuesto.

## Regla 8 — Nada inventado sobre el cliente

Precios, horarios, títulos, direcciones y cuentas de redes **no se inventan
nunca**. Si falta un dato, va a `docs/pendiente-cliente.md` y el sitio se publica
sin esa sección. Un precio inventado en la web de un profesor es un problema
real para él, no un detalle de maquetación.

## Regla 9 — Routing de modelo

| Trabajo | Modelo |
|---|---|
| Buscar, resumir, actualizar docs y estado | `haiku` |
| Implementar HTML/CSS/JS, revisar traducciones, auditar | `sonnet` |
| Diseño de identidad y decisiones de producto | `opus` |

No escales de modelo sin justificarlo en una línea.

## Convenciones

- El contenido de `assets-src/` es **solo lectura**: son los originales del
  cliente. Se procesan hacia `site/**/img/`, nunca se modifican en su sitio.
- Comentarios y documentación en español; el contenido de las webs, en polaco e
  inglés.
- Commits en imperativo, en español, con ámbito: `feat(music): añade bloque de contacto`.
