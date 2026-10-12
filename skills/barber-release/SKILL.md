---
name: barber-release
description: Ejecutar y mantener el servidor local, los checks, el build estático y la publicación en Cloudflare Pages del proyecto Barber Studio.
---

# Validación y publicación de Barber Studio

Ejecutar desde la raíz del checkout de Barber Studio; ubicación original `C:\codex\Barber`. Leer `package.json`, `scripts/` y `.github/workflows/check.yml` actuales: este mapa corresponde al 11 de octubre de 2026.

## Herramientas locales

Node.js >=20, sin dependencias npm ni necesidad de `npm install`.

- `npm run dev`: `scripts/serve.mjs`, servidor en `127.0.0.1:4173`, sirve archivos fuente. Solo admite `index.html`, `styles.css`, `script.js` y `assets/` con un nombre de archivo que coincida con `[\w.-]+`. Subdirectorios, nombres con espacios, nuevas páginas y otras rutas necesitan actualizar el servidor. Los MIME definidos son HTML, CSS, JS y JPG; otros formatos salen como `application/octet-stream` hasta agregar su tipo.
- `npm run check`: `scripts/check.mjs`, comprueba IDs únicos, anclas existentes y acceso a los recursos `src`/`href` del HTML; ejecuta `node --check script.js` y exige el aviso literal de reserva demo. No prueba CSS, navegación ejecutada, accesibilidad completa, funcionamiento del formulario ni disponibilidad. Las URLs externas en `src`/`href` se tratarían como rutas locales: adaptar el check si se introducen.
- `npm run build`: `scripts/build.mjs`, copia los tres archivos raíz y `assets/` a `dist/`. No transforma ni minifica y no limpia artefactos anteriores. Si se eliminó/renombró un recurso, revisar archivos obsoletos o construir en una salida limpia. Nuevos archivos raíz necesitan incorporarse explícitamente al build.
- `.gitignore` excluye `dist/`, `node_modules/`, logs y `.env`/`.env.*`. No versionar salida generada ni secretos.

Mantener rutas relativas para recursos del sitio: son compatibles con Pages bajo un subdirectorio de repositorio. Para cambios que afecten distribución, ejecutar check y build y revisar los recursos de `dist/`; si se quiere servir la salida, ejecutar el servidor con `dist/` como directorio de trabajo y ruta correcta al script (no confundir el dev de fuentes con una prueba del build).

## Cloudflare Pages

Configuración preparada en `README.md`: integración Git con `Dariobod/Barber`, producción desde `main`, preset `None`, raíz del repositorio, comando `npm run check && npm run build`, salida `dist` y `NODE_VERSION=22` para producción y previews. Cloudflare construye y despliega después de un push; un commit local no lo activa. No se necesitan secretos de Cloudflare en el sitio ni un workflow de deploy adicional. La conexión y URL pública deben verificarse en el panel antes de afirmar que la publicación funciona.

Proyecto `barber-pips`, cuenta de Cloudflare de la barbería, URL de producción `https://barber-pips.pages.dev/`. Primera publicación confirmada el 11 de octubre de 2026. Para verificar nuevos cambios, comprobar el commit desplegado en el panel y la URL pública.

## Verificación en GitHub

Workflow `.github/workflows/check.yml`: push a `main`, pull requests o `workflow_dispatch`; runner Ubuntu, Node 22; check → build. Usa permisos `contents: read` y concurrencia por ref con cancelación del run anterior. Sustituye al antiguo deploy de GitHub Pages; Cloudflare despliega mediante su integración Git. Un push a `main` activa publicación: respetar el alcance autorizado al decidir publicar.

Reportar los comandos ejecutados y sus resultados, distinguiendo build local, revisión visual y despliegue confirmado. Actualizar esta skill cuando cambien rutas, scripts o pipeline.
