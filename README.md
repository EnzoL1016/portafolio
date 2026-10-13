# Enzo Lopez — Atlas de sistemas

Portafolio personal estático inspirado en un plano técnico: papel cálido, tinta, verde bosque y mapas conceptuales interactivos propios de cada proyecto. Incluye presentación, formación, tecnologías, tres proyectos principales, dos proyectos adicionales y contacto.

## Abrir localmente

Podés abrir `index.html` con doble clic; los estilos, los proyectos interactivos y los recursos locales funcionan directamente desde `file://`. No necesitás instalar nada para verlo.

Opcionalmente, con Node.js 20 o posterior podés iniciar un servidor local desde esta carpeta:

```sh
npm run dev
```

Abrí http://127.0.0.1:4173. No hay dependencias que instalar. Para ver exactamente la versión publicable:

```sh
npm run build
npm run preview
```

## Publicar gratis en Vercel

1. Creá un repositorio personal de GitHub para este portafolio y subí los archivos fuente de esta carpeta. Excluí `dist`, `qa`, `.vercel`, archivos `.env` y `node_modules`, como indica `.gitignore`.
2. En Vercel elegí **Add New → Project** e importá ese repositorio.
3. Usá **Framework Preset: Other**, **Build Command: npm run build** y **Output Directory: dist**. La configuración ya está en `vercel.json`.
4. No necesitás variables de entorno para que el sitio funcione. Elegí **Deploy**.
5. Vercel asignará una dirección `.vercel.app`. Los siguientes cambios subidos al repositorio se publicarán automáticamente.

Este proyecto genera únicamente archivos estáticos: no requiere servidor persistente, base de datos, token de GitHub, APIs de pago, fuentes externas ni suscripciones de terceros. Vercel Hobby está destinado a proyectos personales no comerciales y tiene límites de uso; consultá https://vercel.com/docs/plans/hobby. Un dominio propio es opcional y su compra no está incluida.

Opcional: configurá `SITE_URL` con la dirección pública final (por ejemplo, tu dirección real `.vercel.app`) para generar el enlace canónico, imagen social con URL absoluta y sitemap. Si Vercel proporciona `VERCEL_PROJECT_PRODUCTION_URL`, el build la usa automáticamente. La URL no se inventa en las vistas previas locales.

La configuración de Vercel sigue su documentación: https://vercel.com/docs/project-configuration.

## Editar contenido

- `index.html`: presentación, formación, tecnologías, contacto y contenido inicial accesible sin JavaScript.
- `data/projects.js`: datos de los tres proyectos, componentes del mapa, enlaces, estados y explicaciones. Si editás el primer proyecto, actualizá también su contenido inicial en HTML.
- `styles.css`: diseño, tamaños responsive, foco visible y movimiento reducido.
- `app.js`: selección de proyectos/nodos y copia del email con mensaje de fallback.
- `assets/`: favicon e imagen para compartir el sitio en redes.
- `RESEARCH.md`: fuentes, hechos comprobados y límites de la investigación.

Las fuentes son el perfil y repositorios de EnzoL1016, el sitio público de Nibbot y los archivos del repositorio Auto-service facilitado por el usuario. A la pelotita se presenta en producción según el README del autor. Nibbot reemplaza al sistema hospitalario entre los proyectos principales. Los mapas son vistas conceptuales de llamadas y componentes, no diagramas exhaustivos de despliegue. No se inventaron puestos laborales, clientes, estadísticas ni certificaciones. Se inspeccionó la presentación y la página de demos públicas de Nibbot; no se probaron operaciones reales de reservas, pagos ni envío de mensajes. El enlace de Nibbot lleva a su producto público, ya que su código es privado.

## Verificación

```sh
npm run check
npm run build
```

El chequeo valida idioma, viewport, descripción, título, IDs únicos, anclas, recursos locales, enlaces externos, sintaxis JavaScript, contenido de los proyectos y configuración de Vercel. El build lo ejecuta antes de generar `dist`.

Durante el desarrollo se verificó en navegador la selección de proyectos y componentes, activación por teclado y copia del email. La revisión final de A la pelotita, Monitor de Precios y Nibbot cubre 320, 375, 768, 1024 y 1440 px. Se midieron los extremos de las flechas contra los bordes de sus nodos, cruces por otros nodos, solapamientos y desbordes: las 15 combinaciones pasaron. También se activaron por teclado los 18 componentes y se verificaron sus explicaciones. No hubo errores o advertencias de consola en la comprobación final. Se corrigieron el posicionamiento fijo y el modelo genérico anterior: ahora cada grafo describe sus componentes y llamadas, y recalcula las conexiones al cambiar el tamaño de pantalla. No se realizó un despliegue en Vercel ni una auditoría completa de accesibilidad o de navegadores distintos.

Las capturas de revisión se guardan en `qa/`, excluido del repositorio y del build. Las fuentes usadas por el diseño son locales al sistema operativo; su aspecto puede variar ligeramente entre dispositivos.

La corrección de apertura directa usa rutas relativas y scripts clásicos cargados en orden. Se comprobaron esos requisitos y el funcionamiento de estilos y selección de proyectos en la vista HTTP local. La herramienta de navegación bloquea el protocolo file://, por lo que no se realizó una prueba directa de apertura como archivo en Brave.
