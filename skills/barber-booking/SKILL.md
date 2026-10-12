---
name: barber-booking
description: Mantener la integración de reservas de The Pip's Barber con Setmore.
---
# Reservas de The Pip's Barber

Estado del 11 de octubre de 2026: agenda de Setmore integrada, sin backend propio. Leer `index.html`, `script.js` y `scripts/check.mjs` antes de editar.

- Página pública: https://barberpips.setmore.com/.
- Pipa: Corte de adultos, 40 min. Hector: Corte de niños, 40 min.
- Ambos de lunes a viernes de 10 a 18, zona Argentina/Buenos Aires; sábado y domingo cerrados. Se puede cambiar luego desde Setmore, actualizando el texto del sitio.
- Correo y teléfono obligatorios. Cuenta de cliente opcional. Para niños usar el contacto del adulto responsable. Tarifas pendientes, ocultas en la página pública.
- `#booking-calendar` es un iframe con título accesible y `allow="web-share"`. El enlace externo permite abrir la agenda si el iframe falla.
- Botones `[data-booking]`: URLs verificadas en la página pública de Setmore, preseleccionan servicio y barbero. `script.js` cambia el iframe y el enlace alternativo, hace scroll respetando reduced motion y enfoca el iframe. Si se recrean servicios/perfiles, renovar las URLs.
- El sitio no captura datos ni confirma citas: Setmore gestiona disponibilidad, conflictos y confirmación. Nunca guardar credenciales en archivos públicos.
- La reunión de ejemplo de 60 min quedó oculta del catálogo público; no se eliminó.
- Ejecutar check y build; probar ambos servicios, calendario visible, selección de barbero correcta, horarios y enlace alternativo. Para confirmar el circuito completo, realizar prueba autorizada de reserva/cancelación y comprobar correos; no afirmar que se verificó sin hacerlo.