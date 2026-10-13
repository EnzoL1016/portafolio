const projects = {
  pelotita: {
    kicker: "SISTEMA 01 / GESTIÓN DEPORTIVA",
    title: "A la pelotita!",
    status: "SaaS · en producción",
    summary: "Una plataforma que reúne reservas, cobros y operación para complejos de fútbol y pádel, con herramientas para quienes administran y quienes juegan.",
    problem: "Coordinar canchas, disponibilidad, reservas y pagos en una experiencia simple para jugadores y complejos.",
    solution: "Un SaaS con gestión de reservas, cobros, panel para dueños, armado de equipos y acceso móvil.",
    stack: "Django 5 · DRF · PostgreSQL · Celery · Redis · React Native · Docker",
    demo: "https://app.alapelotita.com.ar",
    source: "https://github.com/EnzoL1016/EnzoL1016/blob/main/README.md",
    map: "MAPA 01—A",
    graph: {
      caption: "Jugadores y dueños · API · servicios conectados",
      nodes: [
        { id: "players", title: "JUGADORES", subtitle: "PWA / Expo", detail: "La PWA y la app Expo permiten a jugadores descubrir canchas y gestionar sus reservas.", position: [1, 1], mobilePosition: [1, 1] },
        { id: "owners", title: "COMPLEJOS", subtitle: "Panel React", detail: "El panel para dueños organiza la operación de los complejos y la disponibilidad de sus canchas.", position: [1, 3], mobilePosition: [2, 1] },
        { id: "api", title: "API", subtitle: "Django REST · JWT", detail: "Django 5 y Django REST Framework aplican reglas del sistema y autenticación JWT.", position: [2, 2], mobilePosition: [1, 2] },
        { id: "database", title: "DATOS", subtitle: "PostgreSQL", detail: "PostgreSQL guarda la información operativa de la plataforma.", position: [3, 1], mobilePosition: [2, 2] },
        { id: "payments", title: "COBROS", subtitle: "MP Marketplace", detail: "Mercado Pago Marketplace conecta cuentas de complejos por OAuth y gestiona cobros con split de comisión.", position: [3, 3], mobilePosition: [2, 3] },
        { id: "jobs", title: "TRABAJOS", subtitle: "Celery · Redis", detail: "Celery y Redis ejecutan trabajos en segundo plano del sistema.", position: [2, 3], mobilePosition: [1, 3] }
      ],
      edges: [
        { from: "players", to: "api" }, { from: "owners", to: "api" }, { from: "api", to: "database" },
        { from: "api", to: "payments" }, { from: "api", to: "jobs" }
      ]
    }
  },
  precios: {
    kicker: "SISTEMA 02 / APLICACIÓN FULL STACK",
    title: "Monitor de Precios",
    status: "Monitoreo · automatización",
    summary: "Un monitor personal para seguir productos, guardar el historial de precios y recibir un aviso por correo cuando se alcanza el objetivo elegido.",
    problem: "Comparar precios a mano dificulta seguir cambios y saber cuándo una oferta llega al valor buscado.",
    solution: "Una aplicación con seguimiento por usuario, historial, alertas por email y borrado lógico de productos.",
    stack: "React · TypeScript · Vite · Django REST · PostgreSQL · Requests · BeautifulSoup",
    demo: "https://monitor-precios-one.vercel.app",
    source: "https://github.com/EnzoL1016/Monitor-Precios",
    map: "MAPA 02—B",
    graph: {
      caption: "Registro · seguimiento periódico · historial y alerta",
      nodes: [
        { id: "client", title: "CLIENTE", subtitle: "React · Vite", detail: "La interfaz React permite registrar productos y consultar su evolución de precios.", position: [1, 1], mobilePosition: [1, 1] },
        { id: "api", title: "API", subtitle: "Django REST", detail: "La API aplica autenticación JWT y aislamiento de productos por usuario.", position: [2, 1], mobilePosition: [2, 1] },
        { id: "history", title: "HISTORIAL", subtitle: "PostgreSQL", detail: "PostgreSQL conserva productos e historial de precios en el modelo PriceHistory.", position: [3, 1], mobilePosition: [1, 2] },
        { id: "tracking", title: "SEGUIMIENTO", subtitle: "En Django · cada hora", detail: "APScheduler ejecuta el seguimiento dentro de Django cada hora. Requests y BeautifulSoup consultan precios y la tarea registra PriceHistory; cuando se cumple el objetivo, también envía una alerta por correo.", position: [2, 2], mobilePosition: [2, 2] },
        { id: "stores", title: "E-COMMERCE", subtitle: "URLs de productos", detail: "El proceso consulta los sitios de los productos con Requests y BeautifulSoup. Playwright pertenece al entorno local; no se representa como parte del despliegue de producción.", position: [1, 3], mobilePosition: [2, 3] },
        { id: "email", title: "AVISO", subtitle: "Email · send_mail", detail: "Django envía un aviso por correo cuando un precio alcanza el objetivo configurado.", position: [3, 3], mobilePosition: [1, 3] }
      ],
      edges: [
        { from: "client", to: "api" }, { from: "api", to: "history" }, { from: "tracking", to: "history" },
        { from: "tracking", to: "stores" }, { from: "tracking", to: "email" }
      ]
    }
  },
  nibbot: {
    kicker: "SISTEMA 03 / AUTOMATIZACIÓN DE BARBERÍAS",
    title: "Nibbot",
    status: "SaaS · Barberías",
    summary: "Una plataforma multi-tenant que organiza agendas y reservas por WhatsApp, envía recordatorios y reúne cobros y operación en un dashboard para cada barbería.",
    problem: "Coordinar la atención, los turnos y los mensajes mientras se mantiene el control del negocio requiere conectar la agenda con los canales y tareas diarias.",
    solution: "Un bot de reservas por WhatsApp y un panel para gestionar servicios, barberos, horarios y finanzas, con registro de cobros y señas por Mercado Pago.",
    stack: "React · TypeScript · Django REST · PostgreSQL · Node.js · Celery · Redis · Docker",
    demo: "https://nibbot.com.ar/demos/",
    source: "https://nibbot.com.ar",
    demoLabel: "Ver demos",
    sourceLabel: "Ver producto",
    map: "MAPA 03—C",
    graph: {
      caption: "Agenda y bot · WhatsApp · recordatorios y cobros",
      nodes: [
        { id: "dashboard", title: "DASHBOARD", subtitle: "React · TypeScript", detail: "El panel reúne agenda, servicios, barberos, horarios y finanzas de cada barbería.", position: [1, 1], mobilePosition: [1, 1] },
        { id: "api", title: "API", subtitle: "Django REST · bot y turnos", detail: "La API central coordina las reglas de reservas, agenda y datos del negocio para el dashboard y el servicio de WhatsApp.", position: [2, 2], mobilePosition: [2, 2] },
        { id: "database", title: "DATOS", subtitle: "PostgreSQL · barberías", detail: "PostgreSQL almacena la información multi-tenant y los datos operativos de cada barbería.", position: [3, 1], mobilePosition: [2, 1] },
        { id: "whatsapp", title: "WHATSAPP", subtitle: "Node.js · Baileys", detail: "El servicio Node.js con Baileys mantiene sesiones independientes por barbería y conecta las conversaciones con las reservas.", position: [1, 3], mobilePosition: [1, 2] },
        { id: "jobs", title: "TAREAS", subtitle: "Celery · Redis", detail: "Celery procesa las tareas y Redis sostiene la cola. Las confirmaciones y los recordatorios se envían a través del servicio de WhatsApp, con reintentos ante fallos.", position: [2, 3], mobilePosition: [1, 3] },
        { id: "payments", title: "COBROS", subtitle: "Mercado Pago · señas", detail: "Mercado Pago procesa las señas por barbería y la suscripción de la plataforma.", position: [3, 3], mobilePosition: [2, 3] }
      ],
      edges: [
        { from: "dashboard", to: "api" }, { from: "whatsapp", to: "api" }, { from: "api", to: "database" },
        { from: "api", to: "payments" }, { from: "api", to: "jobs" }, { from: "jobs", to: "whatsapp" }
      ]
    }
  }
};
