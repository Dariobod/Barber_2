---
name: barber-frontend
description: Desarrollar la interfaz, el contenido y el diseño responsive del sitio Barber Studio de este repositorio en HTML, CSS y JavaScript nativos.
---

# Interfaz de Barber Studio

Trabajar desde la raíz del proyecto (checkout original: `C:\codex\Barber`). Leer los archivos actuales antes de editar: esta guía describe el estado analizado el 10 de octubre de 2026 y debe actualizarse cuando cambie la arquitectura.

## Estructura y decisiones

- `index.html` contiene toda la landing en español (`lang="es"`): cabecera, hero `#inicio`, servicios `#servicios`, estudio `#nosotros`, galería `#galeria`, reserva `#reservar`, FAQ y pie. `#contenido` es el destino del enlace para saltar al contenido.
- `styles.css` contiene el diseño completo; `script.js` controla menú, elección de servicio, demostración de reserva y año del pie. No hay framework, bundler, componentes ni dependencias npm. Mantener esa simplicidad salvo que el alcance solicitado justifique migrar.
- Voz de marca: voseo argentino, frases breves y oficio de barbería. Marca provisional; no inventar dirección, contacto, tarifas ni datos de un negocio real. Los servicios y duraciones actuales son ilustrativos.
- Paleta en `:root`: `--ink: #171917`, `--paper: #f2efe7`, `--copper: #c09165`, `--muted: #686962`, `--line: #d4d1c7`. Reutilizar variables. Títulos Playfair Display/Georgia y texto DM Sans/sans-serif; Google Fonts se carga por `@import` y tiene alternativas locales.
- Diseño: superficies oscuras para cabecera, hero, reserva y pie; fondo papel en contenido; acento cobre; fotografías desaturadas. Breakpoints existentes de 800 px y 450 px. Cambiar esta identidad cuando el usuario lo pida, no por una preferencia del agente.
- Imágenes locales: `assets/barber.jpg` y `assets/ritual.jpg`, reutilizadas en hero/estudio/galería. Son imágenes de concepto de Unsplash; las fuentes están en `README.md`. No presentarlas como fotos del local. Hero usa `fetchpriority="high"`; las restantes usan `loading="lazy"`.

## Contratos al editar

Conservar o actualizar conjuntamente IDs, anclas y selectores de `script.js`. El menú usa `.menu`, `#nav`, clase `.open`, `aria-expanded` y `aria-controls`; se cierra al navegar y con Escape, devolviendo el foco al botón en este último caso. Los botones `[data-service]` dependen de opciones con el mismo texto en `#service`.

Preservar etiquetas de campos, textos alternativos, foco visible, enlace de salto, FAQ con `details/summary` y mensaje con `role="status"`/`aria-live="polite"`. Respetar `prefers-reduced-motion` tanto en CSS como en el scroll del selector de servicio.

Para validar, ejecutar `npm run check`. Si se cambió layout o interacción, usar `npm run dev` (http://127.0.0.1:4173) y revisar escritorio y móvil, especialmente alrededor de 800/450 px, desbordamiento, menú, foco y formulario. Una validación estática no acredita revisión visual; indicar qué se pudo comprobar. Para cambios de reserva, leer la skill hermana `../barber-booking/SKILL.md`; para archivos distribuidos, leer `../barber-release/SKILL.md`.
