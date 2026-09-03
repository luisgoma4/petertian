# PeterTian

Dos webs de una sola pantalla para Peter Tian, profesor en Poznań (Polonia),
bajo el dominio `petertian.com`.

**Son dos negocios distintos que comparten dominio y nada más.** Clases de chino
por un lado, clases de guitarra y bajo por otro, con públicos que no se solapan.
Por eso `/mandarin` y `/music` no se enlazan entre sí ni a la raíz: solo la
puerta de entrada conoce a las dos.

## Estructura

```
site/                    lo que se publica
├── index.html           puerta con dos botones (estilos propios en línea)
├── CNAME                petertian.com
├── shared/
│   ├── base.css         estructura y accesibilidad — sin un solo color
│   └── i18n.js          conmutador PL/EN por atributos data-pl / data-en
├── mandarin/            theme kraft + navy + burdeos, del flyer del cliente
└── music/               theme nocturno + violeta + ámbar, de la foto de directo

assets-src/              originales del cliente — SOLO LECTURA, nunca editar
docs/                    estado del proyecto (ver .claude/CLAUDE.md, Regla 1)
.claude/                 orquestador: 6 agentes, 6 comandos /pt:*, 2 hooks
```

## Cómo se trabaja aquí

Este proyecto usa un orquestador de agentes. **Lee `.claude/CLAUDE.md` antes de
tocar nada** — son 9 reglas y son cortas.

| Comando | Qué hace |
|---|---|
| `/pt:status` | Dónde va el proyecto, en 10 líneas |
| `/pt:brief` | Fija alcance y plan de una web |
| `/pt:design` | Ajusta los tokens de identidad de una web |
| `/pt:build` | Implementa un bloque o un cambio |
| `/pt:verify` | Audita las dos webs antes de publicar |
| `/pt:ship` | Publica en Cloudflare Pages |

## Stack

HTML, CSS y JS a mano. Sin build, sin dependencias, sin fuentes externas, sin
analytics. Funciona abriendo el `index.html` con doble clic.

Para verlo con las rutas correctas:

```
python3 -m http.server 8080 --directory site
```

## Las cuatro trampas de este repo

1. **Un enlace entre `/mandarin` y `/music` es un bug**, aunque quede bien.
2. **Un color literal fuera de `theme.css` es un bug.** La identidad vive
   entera en los tokens; `base.css` es incoloro a propósito.
3. **Todo texto lleva `data-pl` y `data-en`.** Si falta uno, el conmutador deja
   un hueco. `PTi18n.verificar()` lo canta por consola en local.
4. **Nada sobre el cliente se inventa.** Precios, horarios y titulaciones que
   falten van a `docs/pendiente-cliente.md`, no a la web.

## Estado

Las dos webs están terminadas y auditadas. Falta la revisión visual en navegador,
crear el repo y conectar Cloudflare Pages. Lo que hay que pedirle a Peter está en
`docs/pendiente-cliente.md`.
