# Sistema de diseño

Dos identidades deliberadamente distintas sobre un esqueleto común. Que no se
parezcan es un requisito del negocio, no un descuido.

| Capa | Fichero | Contiene |
|---|---|---|
| Estructura | `site/shared/base.css` | Layout, escala tipográfica, accesibilidad. **Cero colores.** |
| Identidad | `site/<web>/theme.css` | Todos los tokens |
| Puerta | `site/index.html` | Estilos propios en línea (no comparte base.css) |

## Tokens — Mandarin

Extraídos del flyer que ya tenía el cliente (`assets-src/mandarin/`).

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F2E9D8` | Papel kraft |
| `--bg-alt` | `#EADFC8` | Bloque "sobre mí" |
| `--ink` | `#26221C` | Texto |
| `--ink-soft` | `#5C544A` | Texto secundario |
| `--navy` | `#1E3552` | Titulares |
| `--accent` | `#8C2F27` | Burdeos: botones, sello, franja |
| `--on-accent` | `#F7F1E4` | Texto sobre burdeos |
| `--rule` | `#C9B99B` | Filetes |

Tipografía: serif de alto contraste para titulares (`Bookman Old Style` → Georgia
→ serif), sans del sistema para el cuerpo. Rasgos propios: sello vertical
中文教学, chapa circular 你好, franja burdeos al pie. Textura de papel con dos
gradientes radiales — sin imagen que descargar.

## Tokens — Music

Extraídos de la foto de directo (larga exposición, `assets-src/music/`).

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#14101C` | Sala oscura |
| `--bg-alt` | `#1D1729` | Bloque "sobre mí" |
| `--ink` | `#F4F1F8` | Texto |
| `--ink-soft` | `#A79DBB` | Texto secundario |
| `--violet` | `#7B4FE0` | Foco de escenario, iconos |
| `--accent` | `#F2A33C` | Ámbar: titulares de sección, botones |
| `--on-accent` | `#14101C` | Texto sobre ámbar |
| `--rule` | `#362C4A` | Filetes |

Tipografía: sans geométrica pesada en mayúsculas, misma familia para titular y
cuerpo. Rasgos propios: estela degradada ámbar→violeta bajo el titular, botones
de radio completo, halo de focos con gradientes radiales.

## Contraste (AA)

Verificado sobre el fondo real de cada web, no sobre blanco:

| Par | Ratio | Veredicto |
|---|---|---|
| Mandarin `--ink` / `--bg` | 13.12:1 | AA |
| Mandarin `--ink-soft` / `--bg` | 6.17:1 | AA |
| Mandarin `--navy` / `--bg` | 10.33:1 | AA |
| Mandarin `--accent` / `--bg` | 6.83:1 | AA |
| Mandarin `--ink-soft` / `--bg-alt` | 5.63:1 | AA |
| Mandarin `--on-accent` / `--accent` | 7.31:1 | AA |
| Music `--ink` / `--bg` | 16.76:1 | AA |
| Music `--ink-soft` / `--bg` | 7.30:1 | AA |
| Music `--accent` / `--bg` | 8.99:1 | AA |
| Music `--violet-text` / `--bg` | 6.82:1 | AA |
| Music `--on-accent` / `--accent` | 8.99:1 | AA |
| Music `--violet` / `--bg` | 3.60:1 | solo superficies y gráficos, **nunca texto pequeño** |

Medidos con la fórmula WCAG 2.1 sobre el fondo real de cada web. `--violet`
(`#7B4FE0`) no llega a AA para texto pequeño; por eso existe `--violet-text`
(`#A98BF0`), que es el que usa `.eyebrow`. El violeta saturado queda reservado a
fondos de icono y degradados.

## Imágenes

Originales en `assets-src/` (solo lectura). Se derivan a WebP 900/1400 px más un
JPG de respaldo:

```
magick assets-src/<x>.JPG -resize 900x -strip -quality 80 site/<web>/img/<n>-900.webp
```

## Reglas

1. Un color literal fuera de `theme.css` es un bug.
2. Sin fuentes web externas y sin imágenes decorativas descargables.
3. Movimiento solo con `transform` / `opacity` / `filter`, y respetando
   `prefers-reduced-motion`.
