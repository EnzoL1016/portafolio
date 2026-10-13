# Investigación del portafolio de Enzo Lopez

Fecha: 13 de octubre de 2026. Cuenta: https://github.com/EnzoL1016

## Identidad y presentación

El README público del perfil declara: Enzo Lopez; Programador Universitario de Sistemas graduado en UNVIME; especialización en Backend y Full Stack; Villa Mercedes, San Luis; disponible para trabajo remoto.

Contacto publicado: https://linkedin.com/in/enzo-lopez16 y enzolopez1610@gmail.com.

Stack declarado en el perfil: Python, Django REST Framework, Java, Spring Boot, React, TypeScript, Tailwind CSS, Vite, PostgreSQL, MySQL, SQL Server, Docker, Git, Celery, Redis, Jira, BeautifulSoup, Playwright y Requests.

Fuente: https://github.com/EnzoL1016/EnzoL1016/blob/main/README.md
SHA del archivo leído: 4ea426a0c1587482436998c7525cde224b724d34

## Selección editorial preliminar

### 1. A la pelotita!

Según el README del perfil, SaaS en producción para gestionar complejos de fútbol y pádel. Incluye reservas, cobros, Mercado Pago Marketplace con OAuth, panel para dueños, PWA para jugadores, armado de equipos y app Expo/React Native. Backend Django 5 y DRF, JWT, Celery y Redis; infraestructura con PostgreSQL, Docker Compose, Nginx y Cloudflare R2.

Demo publicada en el perfil: https://app.alapelotita.com.ar
Fuente: README del perfil. No se inspeccionó el código de este proyecto ni se verificó la disponibilidad de la demo. No inventar números de usuarios, ingresos, clientes o métricas.

### 2. Monitor de Precios

Aplicación full stack para registrar productos, guardar historial de precios y enviar alertas por email al alcanzar un precio objetivo. JWT, aislamiento por usuario y borrado lógico. El README distingue producción con APScheduler, Requests y BeautifulSoup de entorno local Docker con Playwright y componentes Celery/Redis. Frontend React, TypeScript y Vite; backend Django y DRF; PostgreSQL en Supabase.

Repositorio: https://github.com/EnzoL1016/Monitor-Precios
Fuente: https://github.com/EnzoL1016/Monitor-Precios/blob/main/README.md
SHA leído: 0d2102d1400eca46426743c816056c16249cdb7a
Demo declarada: https://monitor-precios-one.vercel.app
API declarada: https://monitor-precios.onrender.com

### 3. Sistema de Turnos Hospitalarios

Aplicación Django y React con roles de paciente, profesional y administrador. El README indica estado MVP: flujos principales de pacientes y profesionales implementados; administración y funcionalidades avanzadas en desarrollo. Reservas, cancelaciones, agendas, asistencia y justificación de inasistencias. React, TypeScript, Vite, TanStack Query, Zustand y Tailwind. Backend Django/DRF; SQLite en desarrollo según README del proyecto; PostgreSQL y JWT según README del perfil.

Repositorio: https://github.com/EnzoL1016/Hospital_Turnos
Fuente: https://github.com/EnzoL1016/Hospital_Turnos/blob/main/README.md
SHA leído: c273fee508cfc628675a8a83277473bee94f52a5
Demo declarada en perfil: https://hospital-turnos.vercel.app

### 4. API de gestión de tareas

Alternativa secundaria para mostrar Java. pom.xml confirma Java 17, Spring Boot 3.4.4, Spring Data JPA, validación, springdoc OpenAPI y dependencia H2. Su descripción menciona SQLite, pero las dependencias del archivo leído incluyen H2: no afirmar SQLite sin comprobar la configuración.

Fuente: https://github.com/EnzoL1016/task-management-api/blob/main/pom.xml
SHA leído: d97d93be5552bc450e2fb9cc18654961037c8f77

### 5. Voto electrónico

README breve: proyecto colaborativo de voto electrónico en Java. Podría mostrar formación y colaboración; requiere inspección adicional antes de describir funcionalidades.

Fuente: https://github.com/EnzoL1016/Proyecto-Unvime/blob/main/README.md
SHA leído: a11802d8c36a0fba6832881f1cd3288a33bb88d7

## Inventario obtenido con búsqueda GitHub

Se encontraron 22 repositorios públicos: Practicas-POO-Unvime, Hospital_Turnos, Proyecto-Unvime, validacion-formularios, EjerciciosEGG, React-Practicas, Inicio, password-generator-api, Bijou, HTML-CSS, practica_github, Formulario-pacientes, Prueba-node, Formulario-Db-en-python, DOM-con-Javascript, Anotador-Rifa, CRUD-clientes, EnzoL1016, Challenge-Alkemy, Monitor-Precios, DataScience, task-management-api.

No todos se inspeccionaron en profundidad. El tamaño, nombre o antigüedad de un repositorio no prueban calidad ni autoría individual.

## Límites de verificación

Comprobación adicional mediante un agente de investigación: Monitor-Precios/frontend/package.json confirma React 18, TypeScript, Vite 7, Axios, Recharts y Tailwind; backend/requirements.txt confirma Django >=4.2 y <5, DRF, APScheduler, PostgreSQL, Requests y BeautifulSoup. Hospital_Turnos/backend/requirements.txt incluye Django 5.2.5, DRF, JWT, Channels/Redis, Celery y mysqlclient. Hospital_Turnos/frontend/package.json devolvió 404; no afirmar que se validó ese archivo. No se ejecutaron pruebas de estos repositorios.

La lectura del perfil mediante el buscador web falló; la investigación de contenido se realizó mediante el conector GitHub y devolvió los archivos y sus SHA. La consulta directa de la API pública desde la terminal falló por resolución del host. El buscador web tampoco pudo abrir las tres demos; esto no demuestra que estén caídas. No afirmar que se probaron demos, builds o tests de los proyectos.

README.md no encontrado en Bijou ni task-management-api; tampoco se encontraron los paths exploratorios Bijou/package.json ni password-generator-api/pom.xml. Son límites de las rutas consultadas, no pruebas de que los proyectos estén vacíos.

## Propuestas de diseño pendientes de elección

1. Laboratorio de productos: fondo tinta, acento lima, tipografía amplia y diagramas interactivos de producto/arquitectura. Cada proyecto explica problema, solución y decisiones.
2. Enzo OS: escritorio personal con ventanas accesibles para proyectos, perfil y tecnologías; búsqueda rápida y navegación convencional en móvil.
3. Atlas de sistemas: plano técnico claro, líneas y nodos; proyectos como sistemas conectados, con un recorrido que relaciona interfaces, API, datos y despliegue.

La elección del usuario precede a la implementación visual.

## Condición Vercel

Construir el portafolio como sitio estático; sin base de datos, servidor persistente ni servicios pagos necesarios. Publicar contenido investigado durante el build evita requerir un token GitHub en el navegador. Debe incluir instrucciones de despliegue y configuración reproducible.

Vercel Hobby es gratuito para proyectos personales no comerciales y tiene límites de uso. Fuente consultada: https://vercel.com/docs/plans/hobby

## Reglas editoriales

No inventar empleos, años de experiencia, certificaciones, clientes ni resultados cuantificados. La graduación y disponibilidad se atribuyen a la presentación del propio usuario. No convertir un MVP en producto terminado. No incluir capturas fabricadas como si fueran la interfaz real.

## Revisión de los diagramas

El usuario pidió corregir las conexiones y comprobar si era adecuado repetir el mismo esquema. Se reemplaza el modelo genérico de cuatro componentes por vistas funcionales específicas:

- A la pelotita: jugadores y panel de dueños acceden a una API compartida, con persistencia, pagos y tareas asíncronas. Basado en el README del perfil; no se revisó el código privado ni la infraestructura completa.
- Monitor de Precios: interfaz y API acceden al historial; el seguimiento periódico consulta sitios, guarda precios y envía alertas. APScheduler corre dentro de Django en producción; se distingue del entorno local con Celery y Playwright.
- Turnos Hospitalarios: pacientes y profesionales acceden a la API de turnos y a su persistencia. Roles y agendas pertenecen a la aplicación, no son una integración externa. Se evita elegir un motor de producción ante la diferencia entre README del proyecto y perfil.

Se leyó nuevamente el perfil y el README del sistema hospitalario, y además Monitor-Precios/backend/products/tasks.py. Ese código obtiene el precio, actualiza Product, crea PriceHistory y llama send_alert_email cuando se cumple el objetivo; update_all_products_prices itera los productos activos. Fuente: https://github.com/EnzoL1016/Monitor-Precios/blob/main/backend/products/tasks.py (SHA 897aaa7ab4a8dfc89e5e05200173acb5a7dbc905).

Las flechas muestran llamadas principales en una vista conceptual; no describen todos los intercambios HTTP ni una arquitectura completa de despliegue.

## Nibbot / Auto-service

El usuario eligió sustituir Turnos Hospitalarios por Nibbot y facilitó https://nibbot.com.ar y https://github.com/Nibble-inc/Auto-service. El repositorio está en su organización, es privado y pudo leerse mediante el conector GitHub. No es EnzoL1016/autobarber: esa ruta devolvió 404.

La página pública presenta agenda para barberías, reservas conversacionales por WhatsApp, recordatorios, auditoría y finanzas. Su página de demos describe servicios, barberos, horarios, cobros y señas. Se inspeccionaron esas páginas; no se enviaron mensajes ni se probaron pagos o reservas reales.

El README describe SaaS multi-tenant, conexión de WhatsApp por barbería, cobro de señas y suscripciones con Mercado Pago. docker-compose.yml confirma Django, PostgreSQL, Redis, Celery Worker/Beat, servicio WhatsApp, frontend y Nginx. frontend/package.json confirma React, TypeScript y Vite; whatsapp-service/package.json e index.js confirman Node.js, Express y Baileys; backend/requirements/base.txt confirma Django, DRF, JWT, Celery y Channels. backend/apps/notificaciones/tasks.py confirma tareas Celery para confirmaciones y recordatorios que llaman al servicio WhatsApp.

El mapa muestra panel → API; servicio WhatsApp → API; API → persistencia, pagos y tareas; tareas → WhatsApp para recordatorios. Es una vista de alto nivel basada en los componentes revisados, no una descripción de todos los eventos ni de todos los servicios. No se atribuye autoría exclusiva ni un rol empresarial no indicado por el usuario.

Referencias privadas revisadas: README.md (SHA a3ccd4366c3da2bacadd2315fbe872d5e2d692f9), docker-compose.yml (91358f1ce15f973d2e6fb97a3e47bd4d27cf4ece), frontend/package.json (b5de120ef7f6e2fb12cae8e29c185f5e533af2e6), whatsapp-service/package.json (c940c7f3b6fbde7212791091111628a844f4bc6c), backend/requirements/base.txt (c53a6e52a73cf15d77341093fa29feb29b013186), backend/config/urls.py (445b1a71ce7dc75aa7ccf21208b4eee05b9af27a), backend/apps/notificaciones/tasks.py (a0556c8147cad64ed3664350a2c439aafe983162). Se registra la evidencia sin copiar código privado ni credenciales en el sitio público.

Fuentes públicas de la presentación: https://nibbot.com.ar/ y https://nibbot.com.ar/demos/. El buscador web no pudo abrir la primera URL; sí se verificaron las páginas con el navegador.
